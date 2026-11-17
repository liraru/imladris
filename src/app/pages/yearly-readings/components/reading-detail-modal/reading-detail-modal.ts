import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { YearlyReading } from '@shared/models';
import { AuthService } from '../../../../services/auth.service';
import { ReadingProgressService } from '../../../../services/reading-progress.service';
import { ReadingDailyChart } from '../../../../shared/components/reading-daily-chart/reading-daily-chart';
import { ThousandsPipe } from '../../../../shared/pipes/thousands.pipe';

export interface ReadingDetailModalData {
  reading: YearlyReading;
}

export interface ReadingDetailModalResult {
  /** `true` si el usuario ha pulsado "Editar": el llamante debe abrir el formulario en modo edición. */
  edit: boolean;
}

/** Resumen de páginas por día de la lectura. */
interface ReadingDayStats {
  /** Páginas leídas ÷ días de la lectura (mismos días que las columnas del gráfico diario). */
  averagePerDay: number;
  /** Máximo de páginas leídas en un solo día. */
  maxPages: number;
  /** Día (yyyy-MM-dd) en que se alcanzó ese máximo; si hay empate, el primero. */
  maxDate: string;
}

const MS_PER_DAY = 86_400_000;

/** yyyy-MM-dd → Date a medianoche en hora local (evita el desfase de `new Date('yyyy-MM-dd')`, que es UTC). */
function parseDate(value: string): Date {
  const [y, m, d] = value.slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d);
}

@Component({
  selector: 'app-reading-detail-modal',
  imports: [
    DatePipe,
    DecimalPipe,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    ReadingDailyChart,
    ThousandsPipe,
  ],
  templateUrl: './reading-detail-modal.html',
  styleUrl: './reading-detail-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingDetailModal implements OnInit {
  private readonly _dialogRef = inject(MatDialogRef<ReadingDetailModal, ReadingDetailModalResult>);
  private readonly _progressSrv = inject(ReadingProgressService);
  protected readonly data = inject<ReadingDetailModalData>(MAT_DIALOG_DATA);

  protected readonly authService = inject(AuthService);
  protected readonly reading = this.data.reading;

  /** null mientras carga o si la lectura no tiene avances: la plantilla muestra "—" y reserva el sitio. */
  protected readonly stats = signal<ReadingDayStats | null>(null);

  ngOnInit(): void {
    void this._loadStats();
  }

  protected close(): void {
    this._dialogRef.close({ edit: false });
  }

  protected edit(): void {
    if (!this.authService.isAdmin()) return;
    this._dialogRef.close({ edit: true });
  }

  private async _loadStats(): Promise<void> {
    try {
      const records = await this._progressSrv.getByReadingId(this.reading.id);

      const pagesByDay: Record<string, number> = {};
      for (const record of records) {
        const date = record.recordDate.slice(0, 10);
        pagesByDay[date] = (pagesByDay[date] ?? 0) + record.pagesAdvanced;
      }

      const recordedDates = Object.keys(pagesByDay).sort();
      if (recordedDates.length === 0) return;

      // Mismo rango de días que el gráfico diario: desde el inicio (o el primer avance, si es
      // anterior) hasta hoy (lectura en curso) o hasta la fecha de fin (lectura finalizada).
      const startStr = this.reading.startDate?.slice(0, 10);
      const firstDate = startStr && startStr < recordedDates[0] ? startStr : recordedDates[0];

      let end: Date;
      if (this.reading.endDate) {
        const lastRecorded = recordedDates[recordedDates.length - 1];
        const endStr = this.reading.endDate.slice(0, 10);
        end = parseDate(endStr > lastRecorded ? endStr : lastRecorded);
      } else {
        end = new Date();
        end.setHours(0, 0, 0, 0);
      }

      const totalDays = Math.max(
        1,
        Math.round((end.getTime() - parseDate(firstDate).getTime()) / MS_PER_DAY) + 1,
      );

      let totalPages = 0;
      let maxPages = 0;
      let maxDate = '';
      for (const date of recordedDates) {
        const pages = pagesByDay[date];
        totalPages += pages;
        if (pages > maxPages) {
          maxPages = pages;
          maxDate = date;
        }
      }

      this.stats.set({ averagePerDay: totalPages / totalDays, maxPages, maxDate });
    } catch (err) {
      console.error(err);
    }
  }
}
