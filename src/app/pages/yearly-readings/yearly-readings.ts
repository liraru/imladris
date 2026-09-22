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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import { YearlyReadingsSearch } from './components/yearly-readings-search/yearly-readings-search';
import {
  YearlyReadingsFormModal,
  YearlyReadingsFormModalData,
} from './components/yearly-readings-form-modal/yearly-readings-form-modal';
import { AuthService } from '../../services/auth.service';
import { YearlyReadingService } from '../../services/yearly-reading.service';
import { YearlyReading } from '@shared/models';
import { ThousandsPipe } from '../../shared/pipes/thousands.pipe';

@Component({
  imports: [
    YearlyReadingsSearch,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ThousandsPipe,
  ],
  selector: 'app-yearly-readings',
  styleUrl: './yearly-readings.css',
  templateUrl: './yearly-readings.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearlyReadings implements OnInit {
  private readonly _service = inject(YearlyReadingService);
  private readonly _dialog = inject(MatDialog);

  protected readonly authService = inject(AuthService);

  protected readonly selectedYear = signal<number>(new Date().getFullYear());
  protected readonly readings = signal<YearlyReading[]>([]);
  protected readonly availableYears = signal<number[]>([]);
  protected readonly loading = signal<boolean>(true);

  /** Referencia al bloque (título + estantería) que se captura como imagen. */
  protected readonly captureArea = viewChild<ElementRef<HTMLElement>>('captureArea');

  /** Evita clics repetidos mientras se genera la imagen. */
  protected readonly capturing = signal<boolean>(false);

  /**
   * Controla si la cabecera de texto (título + resumen) dentro del área de captura
   * está visible. Permanece oculta en la página normal (display:none) y solo se
   * muestra durante la ventana de tiempo en la que se genera el canvas, porque
   * html2canvas no captura elementos con display:none.
   */
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
      data: { year: this.selectedYear(), reading } satisfies YearlyReadingsFormModalData,
    });
    const updated = await firstValueFrom(ref.afterClosed());
    if (updated) await this.loadReadings(this.selectedYear());
  }

  protected async deleteReading(reading: YearlyReading, event: Event): Promise<void> {
    event.stopPropagation();
    if (!this.authService.isAdmin()) return;
    if (!confirm(`¿Eliminar "${reading.title}" del historial?`)) return;
    await this._service.remove(reading.id);
    await this.loadReadings(this.selectedYear());
  }

  /**
   * Genera una imagen PNG del año seleccionado (título + portadas) y la descarga.
   * Solo disponible para el usuario administrador logeado. Durante la captura, el
   * contenedor crece a lo ancho (ver `.capture-area--capturing` en el CSS) para
   * alojar 7 carátulas al mismo tamaño que en la vista normal, en vez de encogerlas
   * para caber en el ancho de pantalla. `windowWidth` se calcula a partir del ancho
   * ya renderizado para que html2canvas no recorte el resultado.
   */
  protected async downloadYearImage(): Promise<void> {
    if (!this.authService.isAdmin() || this.capturing()) return;

    const element = this.captureArea()?.nativeElement;
    if (!element) return;

    this.capturing.set(true);
    this.showCaptureHeader.set(true);

    try {
      // Espera a que Angular pinte la cabecera de captura y el ancho ampliado antes de fotografiarlos.
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
}
