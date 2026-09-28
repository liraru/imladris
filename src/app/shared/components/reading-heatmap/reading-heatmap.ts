import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReadingProgressService } from '../../../services/reading-progress.service';

interface HeatmapDay {
  /** yyyy-MM-dd. Vacío en las celdas de relleno previas al primer día del rango. */
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  /** Celda de relleno (no es un día real): mantiene la alineación por día de la semana. */
  empty: boolean;
}

/** Meses hacia atrás del rango en escritorio (1 año) y en móvil. */
const DESKTOP_MONTHS_BACK = 12;
const MOBILE_MONTHS_BACK = 4;

/** Si al primer mes del rango le quedan menos días que estos, no se muestra su etiqueta. */
const MIN_DAYS_FOR_FIRST_MONTH_LABEL = 15;

@Component({
  selector: 'app-reading-heatmap',
  imports: [DatePipe, DecimalPipe, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './reading-heatmap.html',
  styleUrl: './reading-heatmap.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingHeatmap {
  private readonly _service = inject(ReadingProgressService);

  /** Muestra la línea "N páginas leídas en …" sobre el mapa. La home la oculta y la muestra en sus cifras. */
  readonly showTitle = input(true);

  /** true por debajo de 768px, igual que el resto de la app (navbar, gestión, home, etc.). */
  protected readonly isMobile = toSignal(
    inject(BreakpointObserver)
      .observe('(max-width: 767px)')
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  protected readonly loading = signal(true);
  protected readonly weeks = signal<HeatmapDay[][]>([]);
  protected readonly monthLabels = signal<{ label: string; weekIndex: number }[]>([]);
  protected readonly totalPages = signal(0);

  /** Etiqueta de mes por índice de semana. Cada semana pinta la suya en su primera fila, así las celdas y las etiquetas nunca se desalinean. */
  protected readonly monthLabelByWeek = computed<Record<number, string>>(() => {
    const byWeek: Record<number, string> = {};
    for (const m of this.monthLabels()) {
      byWeek[m.weekIndex] = m.label;
    }
    return byWeek;
  });

  /** Texto del periodo mostrado, acorde al rango real cargado (recortado a 4 meses en móvil). */
  protected readonly rangeLabel = computed(() =>
    this.isMobile() ? 'en los últimos 4 meses' : 'en el último año',
  );

  private readonly _monthNames = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];

  constructor() {
    // Recarga al cambiar de breakpoint (recorte a 4 meses en móvil) y cada vez que se
    // registra/edita/borra un avance de lectura desde cualquier punto de la app.
    effect(() => {
      const mobile = this.isMobile();
      this._service.progressChanged();
      this._load(mobile);
    });
  }

  protected dayTooltip(day: HeatmapDay): string {
    return day.count > 0
      ? `${day.count} página${day.count === 1 ? '' : 's'} leída${day.count === 1 ? '' : 's'}`
      : 'Sin páginas leídas';
  }

  private async _load(mobile: boolean): Promise<void> {
    this.loading.set(true);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Primer día del rango: hoy menos N meses, más un día (p. ej. hoy 28/09 → 29/09 del año
    // anterior en escritorio y 29/05 en móvil).
    const start = this._shiftMonths(today, mobile ? MOBILE_MONTHS_BACK : DESKTOP_MONTHS_BACK);
    start.setDate(start.getDate() + 1);

    const pagesByDay = await this._service.getPagesByDay(this._toDateString(start));

    const days: HeatmapDay[] = [];

    // Relleno hasta el lunes de la primera semana, para alinear las filas por día de la
    // semana (lunes arriba, domingo abajo) sin mostrar días anteriores al inicio del rango.
    const leadingBlanks = (start.getDay() + 6) % 7;
    for (let i = 0; i < leadingBlanks; i++) {
      days.push({ date: '', count: 0, level: 0, empty: true });
    }

    const cursor = new Date(start);
    while (cursor <= today) {
      const dateStr = this._toDateString(cursor);
      const count = pagesByDay[dateStr] ?? 0;
      days.push({ date: dateStr, count, level: this._level(count), empty: false });
      cursor.setDate(cursor.getDate() + 1);
    }

    const weeks: HeatmapDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    // Días del rango que pertenecen al primer mes (desde el primer día visible hasta fin de mes).
    const daysInFirstMonth =
      new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate() - start.getDate() + 1;

    const monthLabels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const firstRealDay = week.find((d) => !d.empty);
      if (!firstRealDay) return;
      const month = Number(firstRealDay.date.slice(5, 7)) - 1;
      if (month === lastMonth) return;
      lastMonth = month;

      // Con pocos días, la etiqueta del primer mes montaría sobre la del mes siguiente.
      if (weekIndex === 0 && daysInFirstMonth < MIN_DAYS_FOR_FIRST_MONTH_LABEL) return;

      monthLabels.push({ label: this._monthNames[month], weekIndex });
    });

    this.weeks.set(weeks);
    this.monthLabels.set(monthLabels);
    this.totalPages.set(Object.values(pagesByDay).reduce((s, n) => s + n, 0));
    this.loading.set(false);
  }

  /** Retrocede `months` meses conservando el día, ajustándolo si el mes destino es más corto. */
  private _shiftMonths(date: Date, months: number): Date {
    const target = new Date(date.getFullYear(), date.getMonth() - months, 1);
    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    target.setDate(Math.min(date.getDate(), lastDay));
    return target;
  }

  private _level(count: number): 0 | 1 | 2 | 3 | 4 {
    if (count <= 0) return 0;
    if (count < 15) return 1;
    if (count < 30) return 2;
    if (count < 60) return 3;
    return 4;
  }

  private _toDateString(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
