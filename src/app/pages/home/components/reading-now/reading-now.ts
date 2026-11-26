import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import { ROUTES } from '@shared/constants';
import { YearlyReading } from '@shared/models';
import { AuthService } from '../../../../services/auth.service';
import { ReadingDailyChart } from '../../../../shared/components/reading-daily-chart/reading-daily-chart';
import {
  ReadingProgressFormModal,
  ReadingProgressFormModalData,
} from '../../../../shared/components/reading-progress-form-modal/reading-progress-form-modal';
import {
  ReadingProgressHistoryModal,
  ReadingProgressHistoryModalData,
} from '../../../yearly-readings/components/reading-progress-history-modal/reading-progress-history-modal';
import { parseDate } from '../../utils/date.utils';

const MS_PER_DAY = 86_400_000;

/** Lectura en curso con los datos derivados que pinta la tarjeta destacada de "Leyendo". */
interface ReadingNowView {
  reading: YearlyReading;
  /** Último porcentaje registrado, acotado a 0-100. */
  percentage: number;
  pagesRead: number;
  totalPages: number;
  /** Páginas leídas hoy en esta lectura (0 si no hay avances hoy). Solo se muestra al usuario logado. */
  pagesToday: number;
  /** Días de lectura contando el de inicio y el de hoy (mismo criterio que las columnas del gráfico diario). */
  daysReading: number;
  /** Estimación según el ritmo medio desde que empezó; null si aún no hay base para calcularla. */
  estimatedEnd: Date | null;
}

@Component({
  selector: 'app-reading-now',
  imports: [
    RouterLink,
    DatePipe,
    DecimalPipe,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    ReadingDailyChart,
  ],
  templateUrl: './reading-now.html',
  styleUrl: './reading-now.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingNow {
  private readonly _dialog = inject(MatDialog);

  protected readonly authService = inject(AuthService);
  protected readonly ROUTES = ROUTES;

  /** Lecturas actualmente en curso (sin fecha de fin), más recientes primero. */
  readonly readings = input.required<YearlyReading[]>();
  /** Último porcentaje de avance registrado para cada lectura en curso, por id. */
  readonly progressByReadingId = input.required<Record<number, number>>();
  /** Páginas leídas hoy en cada lectura en curso, por id. */
  readonly pagesTodayByReadingId = input.required<Record<number, number>>();

  /** Se emite cuando una acción (registrar avance, historial) puede haber cambiado las lecturas. */
  readonly readingsChanged = output<void>();

  /** Lecturas en curso con porcentaje, páginas leídas, días y fecha estimada de fin ya calculados. */
  protected readonly readingNowView = computed<ReadingNowView[]>(() => {
    const progress = this.progressByReadingId();
    const pagesTodayById = this.pagesTodayByReadingId();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.readings().map((reading) => {
      const percentage = Math.min(100, Math.max(0, progress[reading.id] ?? 0));
      const totalPages = Number(reading.pages) || 0;
      const pagesRead = Math.round((totalPages * percentage) / 100);
      const pagesToday = pagesTodayById[reading.id] ?? 0;

      // Se cuenta el día de inicio como día 1 (igual que las columnas del gráfico diario):
      // empezar hoy es 1 día de lectura. Si la fecha de inicio es futura, 0.
      const start = reading.startDate ? parseDate(reading.startDate) : null;
      const elapsedDays = start ? Math.round((today.getTime() - start.getTime()) / MS_PER_DAY) : -1;
      const daysReading = elapsedDays >= 0 ? elapsedDays + 1 : 0;

      let estimatedEnd: Date | null = null;
      if (percentage > 0 && percentage < 100 && daysReading > 0) {
        const remainingDays = Math.ceil((daysReading * (100 - percentage)) / percentage);
        estimatedEnd = new Date(today);
        estimatedEnd.setDate(estimatedEnd.getDate() + remainingDays);
      }

      return {
        reading,
        percentage,
        pagesRead,
        totalPages,
        pagesToday,
        daysReading,
        estimatedEnd,
      };
    });
  });

  /** Opción "Añadir" del menú de la tarjeta: abre la modal de registro de avance de la lectura. */
  protected async registerProgress(reading: YearlyReading): Promise<void> {
    if (!this.authService.isAdmin()) return;

    const ref = this._dialog.open(ReadingProgressFormModal, {
      width: '480px',
      disableClose: true,
      data: { reading } satisfies ReadingProgressFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    // Home recarga las lecturas (y no solo el avance): si se ha marcado como completada,
    // la lectura pasa de "Leyendo" a "Últimas lecturas".
    if (saved) this.readingsChanged.emit();
  }

  /** Opción "Historial" del menú de la tarjeta: abre el histórico de avances de la lectura. */
  protected async openHistory(reading: YearlyReading): Promise<void> {
    if (!this.authService.isAdmin()) return;

    const ref = this._dialog.open(ReadingProgressHistoryModal, {
      width: '640px',
      maxWidth: '95vw',
      data: { reading } satisfies ReadingProgressHistoryModalData,
    });
    await firstValueFrom(ref.afterClosed());
    // Desde el histórico se pueden registrar, editar o borrar avances y marcar la lectura como
    // completada, así que al cerrarlo Home refresca las lecturas y su porcentaje.
    this.readingsChanged.emit();
  }
}
