import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import { YearlyReadingsSearch } from './components/yearly-readings-search/yearly-readings-search';
import {
  YearlyReadingsFormModal,
  YearlyReadingsFormModalData,
} from './components/yearly-readings-form-modal/yearly-readings-form-modal';
import {
  ReadingDetailModal,
  ReadingDetailModalData,
  ReadingDetailModalResult,
} from './components/reading-detail-modal/reading-detail-modal';
import {
  ReadingProgressHistoryModal,
  ReadingProgressHistoryModalData,
} from './components/reading-progress-history-modal/reading-progress-history-modal';
import { AuthService } from '../../services/auth.service';
import { YearlyReadingService } from '../../services/yearly-reading.service';
import { ReadingProgressService } from '../../services/reading-progress.service';
import { YearlyReading } from '@shared/models';
import { ThousandsPipe } from '../../shared/pipes/thousands.pipe';
import { ReadingProgressBar } from '../../shared/components/reading-progress-bar/reading-progress-bar';
import {
  ReadingProgressFormModal,
  ReadingProgressFormModalData,
} from '../../shared/components/reading-progress-form-modal/reading-progress-form-modal';

@Component({
  imports: [
    YearlyReadingsSearch,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ThousandsPipe,
    ReadingProgressBar,
  ],
  selector: 'app-yearly-readings',
  styleUrl: './yearly-readings.css',
  templateUrl: './yearly-readings.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearlyReadings implements OnInit {
  private readonly _service = inject(YearlyReadingService);
  private readonly _readingProgressSrv = inject(ReadingProgressService);
  private readonly _dialog = inject(MatDialog);

  protected readonly authService = inject(AuthService);

  protected readonly selectedYear = signal<number>(new Date().getFullYear());
  protected readonly readings = signal<YearlyReading[]>([]);
  protected readonly availableYears = signal<number[]>([]);
  protected readonly loading = signal<boolean>(true);

  /** Último porcentaje de avance registrado para cada lectura del año visible, por id. */
  protected readonly progressByReadingId = signal<Record<number, number>>({});

  protected readonly captureArea = viewChild<ElementRef<HTMLElement>>('captureArea');
  protected readonly capturing = signal<boolean>(false);
  protected readonly showCaptureHeader = signal<boolean>(false);

  protected readonly totalPages = computed(() =>
    this.readings().reduce((sum, r) => sum + (r.pages ?? 0), 0),
  );

  async ngOnInit(): Promise<void> {
    await this.loadAvailableYears();
    await this.loadReadings(this.selectedYear());
  }

  protected async onYearChange(year: number): Promise<void> {
    if (year === this.selectedYear()) return;
    this.selectedYear.set(year);
    await this.loadReadings(year);
  }

  protected async openCreateModal(): Promise<void> {
    if (!this.authService.isAdmin()) return;

    const ref = this._dialog.open(YearlyReadingsFormModal, {
      width: '560px',
      disableClose: true,
      data: { year: this.selectedYear() } satisfies YearlyReadingsFormModalData,
    });
    const created = await firstValueFrom(ref.afterClosed());
    if (created) {
      await this.loadAvailableYears();
      await this.loadReadings(this.selectedYear());
    }
  }

  protected async openEditModal(reading: YearlyReading): Promise<void> {
    if (!this.authService.isAdmin()) return;

    const ref = this._dialog.open(YearlyReadingsFormModal, {
      width: '560px',
      disableClose: true,
      data: { year: this.selectedYear(), reading } satisfies YearlyReadingsFormModalData,
    });
    const updated = await firstValueFrom(ref.afterClosed());
    if (updated) await this.loadReadings(this.selectedYear());
  }

  /** Se abre al clicar la tarjeta o desde "Ver detalle" del menú; "Editar" dentro de la ficha reenvía a la edición. */
  protected async openDetailModal(reading: YearlyReading): Promise<void> {
    const ref = this._dialog.open<
      ReadingDetailModal,
      ReadingDetailModalData,
      ReadingDetailModalResult
    >(ReadingDetailModal, { width: '640px', maxWidth: '95vw', data: { reading } });
    const result = await firstValueFrom(ref.afterClosed());
    if (result?.edit) await this.openEditModal(reading);
  }

  protected openHistoryModal(reading: YearlyReading): void {
    this._dialog.open(ReadingProgressHistoryModal, {
      width: '640px',
      maxWidth: '95vw',
      data: { reading } satisfies ReadingProgressHistoryModalData,
    });
  }

  protected async registerProgress(reading: YearlyReading): Promise<void> {
    if (!this.authService.isAdmin()) return;

    const ref = this._dialog.open(ReadingProgressFormModal, {
      width: '480px',
      disableClose: true,
      data: { reading } satisfies ReadingProgressFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this._loadProgress();
  }

  protected async deleteReading(reading: YearlyReading): Promise<void> {
    if (!this.authService.isAdmin()) return;
    if (!confirm(`¿Eliminar "${reading.title}" del historial?`)) return;
    await this._service.remove(reading.id);
    await this.loadReadings(this.selectedYear());
  }

  protected async downloadYearImage(): Promise<void> {
    if (!this.authService.isAdmin() || this.capturing()) return;

    const element = this.captureArea()?.nativeElement;
    if (!element) return;

    this.capturing.set(true);
    this.showCaptureHeader.set(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 50));

      const { default: html2canvas } = await import('html2canvas');

      const canvas = await html2canvas(element, {
        backgroundColor: '#17171f',
        scale: 2,
        useCORS: true,
        windowWidth: Math.max(element.scrollWidth + 100, 1440),
        windowHeight: Math.max(element.scrollHeight + 200, 900),
      });

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `imladris-lecturas-${this.selectedYear()}.png`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generando la imagen del año', err);
    } finally {
      this.showCaptureHeader.set(false);
      this.capturing.set(false);
    }
  }

  private async loadReadings(year: number): Promise<void> {
    this.loading.set(true);
    try {
      this.readings.set(await this._service.getByYear(year));
      await this._loadProgress();
    } finally {
      this.loading.set(false);
    }
  }

  private async loadAvailableYears(): Promise<void> {
    const all = await this._service.getAll();
    const years = Array.from(new Set(all.map((r) => r.year))).sort((a, b) => b - a);
    if (years.length) {
      this.availableYears.set(years);
      if (!years.includes(this.selectedYear())) this.selectedYear.set(years[0]);
    } else {
      this.availableYears.set([this.selectedYear()]);
    }
  }

  /** Último porcentaje de avance de cada lectura del año visible, para la barra de progreso. */
  private async _loadProgress(): Promise<void> {
    const ids = this.readings().map((r) => r.id);
    this.progressByReadingId.set(
      ids.length ? await this._readingProgressSrv.getLatestPercentages(ids) : {},
    );
  }
}
