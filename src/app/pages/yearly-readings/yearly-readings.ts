import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
import { YearlyReadingsSearch } from './components/yearly-readings-search/yearly-readings-search';
import {
  YearlyReadingsFormModal,
  YearlyReadingsFormModalData,
} from './components/yearly-readings-form-modal/yearly-readings-form-modal';
import { YearlyReadingService } from '../../services/yearly-reading.service';
import { YearlyReading } from '@shared/models';

@Component({
  imports: [YearlyReadingsSearch, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  selector: 'app-yearly-readings',
  styleUrl: './yearly-readings.css',
  templateUrl: './yearly-readings.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearlyReadings implements OnInit {
  private readonly _service = inject(YearlyReadingService);
  private readonly _dialog = inject(MatDialog);

  protected readonly selectedYear = signal<number>(new Date().getFullYear());
  protected readonly readings = signal<YearlyReading[]>([]);
  protected readonly availableYears = signal<number[]>([]);
  protected readonly loading = signal<boolean>(true);

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
    const ref = this._dialog.open(YearlyReadingsFormModal, {
      width: '560px',
      data: { year: this.selectedYear(), reading } satisfies YearlyReadingsFormModalData,
    });
    const updated = await firstValueFrom(ref.afterClosed());
    if (updated) await this.loadReadings(this.selectedYear());
  }

  protected async deleteReading(reading: YearlyReading, event: Event): Promise<void> {
    event.stopPropagation();
    if (!confirm(`¿Eliminar "${reading.title}" del historial?`)) return;
    await this._service.remove(reading.id);
    await this.loadReadings(this.selectedYear());
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
