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
import { AuthService } from '../../../services/auth.service';
import { ReadingProgressService } from '../../../services/reading-progress.service';

interface HeatmapDay {
  /** yyyy-MM-dd. Vacío en las celdas de relleno previas al primer día del rango. */
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  /** Celda de relleno (no es un día real): mantiene la alineación por día de la semana. */
  empty: boolean;
}

/** Resumen del último año (rango de escritorio), con independencia del rango que dibuje la cuadrícula. */
export interface HeatmapSummary {
  /** Días del año con al menos una página leída. */
  readingDays: number;
  /** Días totales del año. */
  totalDays: number;
  /** Mayor nº de días consecutivos leyendo dentro del año. */
  longestStreak: number;
  /** Mes con más páginas leídas; `date` es el día 1 de ese mes (yyyy-MM-dd). */
  bestMonth: { date: string; pages: number } | null;
  /** Media de páginas por día con lectura (0 si no hay ninguno). */
  pagesPerReadingDay: number;
  /** Páginas leídas en el mes en curso; `date` es el día 1 de ese mes (yyyy-MM-dd). */
  thisMonth: { date: string; pages: number };
}

/** Una intensidad de la leyenda con el texto de su tooltip. */
interface HeatmapLegendLevel {
  level: 0 | 1 | 2 | 3 | 4;
  tooltip: string;
}

/** Etiqueta de mes sobre la cuadrícula. */
interface HeatmapMonthLabel {
  label: string;
  weekIndex: number;
  /** true si no cabe hacia la derecha: se alinea por su borde derecho y crece hacia la izquierda. */
  alignEnd: boolean;
}

/** Meses hacia atrás del rango en escritorio (1 año) y en móvil. */
const DESKTOP_MONTHS_BACK = 12;
const MOBILE_MONTHS_BACK = 4;

/**
 * Si desde la columna de un mes hasta el final quedan menos columnas que estas, su etiqueta no
 * cabe hacia la derecha: se alinea por su borde derecho y se desplaza hacia la izquierda, para
 * que no se salga del contenedor (ni provoque scroll) y el mes siga indicado.
 */
const MIN_WEEKS_FOR_UNSHIFTED_LABEL = 3;

/** Si al primer mes del rango le quedan menos días que estos, no se muestra su etiqueta. */
const MIN_DAYS_FOR_FIRST_MONTH_LABEL = 15;

/**
 * Páginas mínimas de cada intensidad (niveles 1 a 4). Única fuente de verdad: la usan tanto
 * el cálculo del nivel de cada día como los tooltips de la leyenda.
 * Nivel 1: 1–14 · Nivel 2: 15–29 · Nivel 3: 30–59 · Nivel 4: 60 o más.
 */
const LEVEL_MIN_PAGES = [1, 15, 30, 60] as const;

/** Genera el texto del rango de páginas de un nivel (1 a 4). */
function levelRangeLabel(level: 1 | 2 | 3 | 4): string {
  const min = LEVEL_MIN_PAGES[level - 1];
  // `.at()` devuelve `number | undefined`: para el nivel 4 no hay umbral siguiente.
  const next = LEVEL_MIN_PAGES.at(level);
  if (next === undefined) {
    return `${min} páginas o más`;
  }
  const max = next - 1;
  return min === max ? `${min} página` : `${min}–${max} páginas`;
}

@Component({
  selector: 'app-reading-heatmap',
  imports: [DatePipe, DecimalPipe, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './reading-heatmap.html',
  styleUrl: './reading-heatmap.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingHeatmap {
  private readonly _service = inject(ReadingProgressService);
  private readonly _authService = inject(AuthService);

  /** Muestra la línea "N páginas leídas en …" sobre el mapa. La home la oculta y la muestra en sus cifras. */
  readonly showTitle = input(true);

  /**
   * Muestra bajo el mapa un resumen anual (días con lectura, racha más larga, mejor mes, media
   * y páginas de este mes). Solo en escritorio: en móvil la home muestra esas mismas cifras en
   * su panel "En cifras", leyéndolas de `summary`.
   */
  readonly showSummary = input(false);

  /** true por debajo de 768px, igual que el resto de la app (navbar, gestión, home, etc.). */
  protected readonly isMobile = toSignal(
    inject(BreakpointObserver)
      .observe('(max-width: 767px)')
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  protected readonly loading = signal(true);
  protected readonly weeks = signal<HeatmapDay[][]>([]);
  protected readonly monthLabels = signal<HeatmapMonthLabel[]>([]);
  protected readonly totalPages = signal(0);

  /**
   * Resumen anual (null mientras no se ha calculado). Es el mismo en móvil y en escritorio: se
   * calcula siempre sobre el último año. Es público: la home lo lee para mostrar estas cifras en
   * su panel "En cifras" cuando el resumen bajo el mapa no se ve.
   */
  readonly summary = signal<HeatmapSummary | null>(null);

  /** Intensidades de la leyenda (de menos a más) con el rango de páginas de cada una como tooltip. */
  protected readonly legendLevels: readonly HeatmapLegendLevel[] = [
    { level: 0, tooltip: 'Sin páginas leídas' },
    { level: 1, tooltip: levelRangeLabel(1) },
    { level: 2, tooltip: levelRangeLabel(2) },
    { level: 3, tooltip: levelRangeLabel(3) },
    { level: 4, tooltip: levelRangeLabel(4) },
  ];

  /** Resumen visible: solo si se ha pedido y no es móvil (en móvil los paneles van apilados y no sobra espacio). */
  protected readonly visibleSummary = computed(() =>
    this.showSummary() && !this.isMobile() ? this.summary() : null,
  );

  /** Etiqueta de mes por índice de semana. Cada semana pinta la suya en su primera fila, así las celdas y las etiquetas nunca se desalinean. */
  protected readonly monthLabelByWeek = computed<Record<number, HeatmapMonthLabel>>(() => {
    const byWeek: Record<number, HeatmapMonthLabel> = {};
    for (const m of this.monthLabels()) {
      byWeek[m.weekIndex] = m;
    }
    return byWeek;
  });

  /** Texto del periodo mostrado, acorde al rango real de la cuadrícula (recortado a 4 meses en móvil). */
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
    // Recarga al cambiar de breakpoint (recorte a 4 meses en móvil), al iniciar/cerrar sesión
    // (los invitados ven 0 páginas en el día de hoy) y cada vez que se registra/edita/borra un
    // avance de lectura desde cualquier punto de la app.
    effect(() => {
      const mobile = this.isMobile();
      const isAdmin = this._authService.isAdmin();
      this._service.progressChanged();
      void this._load(mobile, isAdmin);
    });
  }

  protected dayTooltip(day: HeatmapDay): string {
    return day.count > 0
      ? `${day.count} página${day.count === 1 ? '' : 's'} leída${day.count === 1 ? '' : 's'}`
      : 'Sin páginas leídas';
  }

  private async _load(mobile: boolean, isAdmin: boolean): Promise<void> {
    this.loading.set(true);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Se pide siempre el rango anual: el resumen es el mismo en móvil y en escritorio. En móvil
    // la cuadrícula se recorta después a los últimos 4 meses.
    const yearStart = this._rangeStart(today, DESKTOP_MONTHS_BACK);
    const rawPagesByDay = await this._service.getPagesByDay(this._toDateString(yearStart));

    // Los invitados no ven las páginas de hoy: se fuerzan a 0 antes de calcular niveles,
    // total y resumen, para que todo el mapa sea coherente con ese 0.
    const pagesByDay: Record<string, number> = isAdmin
      ? rawPagesByDay
      : { ...rawPagesByDay, [this._toDateString(today)]: 0 };

    const yearDays = this._buildDays(yearStart, today, pagesByDay);
    const days = mobile
      ? this._buildDays(this._rangeStart(today, MOBILE_MONTHS_BACK), today, pagesByDay)
      : yearDays;

    const start = mobile ? this._rangeStart(today, MOBILE_MONTHS_BACK) : yearStart;

    const weeks: HeatmapDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    // Días del rango que pertenecen al primer mes (desde el primer día visible hasta fin de mes).
    const daysInFirstMonth =
      new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate() - start.getDate() + 1;

    const monthLabels: HeatmapMonthLabel[] = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const firstRealDay = week.find((d) => !d.empty);
      if (!firstRealDay) return;
      const month = Number(firstRealDay.date.slice(5, 7)) - 1;
      if (month === lastMonth) return;
      lastMonth = month;

      // Con pocos días, la etiqueta del primer mes montaría sobre la del mes siguiente.
      if (weekIndex === 0 && daysInFirstMonth < MIN_DAYS_FOR_FIRST_MONTH_LABEL) return;

      // Con pocas columnas hasta el final, la etiqueta no cabe a la derecha: se alinea al borde
      // derecho y crece hacia la izquierda.
      monthLabels.push({
        label: this._monthNames[month],
        weekIndex,
        alignEnd: weeks.length - weekIndex < MIN_WEEKS_FOR_UNSHIFTED_LABEL,
      });
    });

    this.weeks.set(weeks);
    this.monthLabels.set(monthLabels);
    // Total del rango dibujado (4 meses en móvil, 1 año en escritorio).
    this.totalPages.set(days.reduce((sum, day) => sum + day.count, 0));
    // Resumen siempre anual.
    this.summary.set(this._buildSummary(yearDays, today));
    this.loading.set(false);
  }

  /**
   * Días reales desde `start` hasta `today`, precedidos del relleno hasta el lunes de la primera
   * semana para alinear las filas por día de la semana (lunes arriba, domingo abajo) sin mostrar
   * días anteriores al inicio del rango.
   */
  private _buildDays(start: Date, today: Date, pagesByDay: Record<string, number>): HeatmapDay[] {
    const days: HeatmapDay[] = [];

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

    return days;
  }

  /**
   * Primer día de un rango que acaba hoy: hoy menos N meses, más un día (p. ej. hoy 28/09 →
   * 29/09 del año anterior con 12 meses y 29/05 con 4).
   */
  private _rangeStart(today: Date, monthsBack: number): Date {
    const start = this._shiftMonths(today, monthsBack);
    start.setDate(start.getDate() + 1);
    return start;
  }

  /**
   * Días con lectura, racha más larga, mes con más páginas, media por día y páginas del mes en
   * curso, a partir de los días reales del rango anual.
   */
  private _buildSummary(days: HeatmapDay[], today: Date): HeatmapSummary {
    let readingDays = 0;
    let totalDays = 0;
    let longestStreak = 0;
    let run = 0;
    let pagesOnReadingDays = 0;
    const pagesByMonth = new Map<string, number>();

    for (const day of days) {
      if (day.empty) continue;
      totalDays++;

      if (day.count > 0) {
        readingDays++;
        run++;
        longestStreak = Math.max(longestStreak, run);
        pagesOnReadingDays += day.count;

        const monthKey = day.date.slice(0, 7); // yyyy-MM
        pagesByMonth.set(monthKey, (pagesByMonth.get(monthKey) ?? 0) + day.count);
      } else {
        run = 0;
      }
    }

    let bestMonth: HeatmapSummary['bestMonth'] = null;
    for (const [monthKey, pages] of pagesByMonth) {
      if (!bestMonth || pages > bestMonth.pages) {
        bestMonth = { date: `${monthKey}-01`, pages };
      }
    }

    const pagesPerReadingDay = readingDays > 0 ? pagesOnReadingDays / readingDays : 0;

    // El mes en curso siempre cabe entero en el rango anual; sin lecturas este mes son 0.
    const currentMonthKey = this._toDateString(today).slice(0, 7);
    const thisMonth = {
      date: `${currentMonthKey}-01`,
      pages: pagesByMonth.get(currentMonthKey) ?? 0,
    };

    return { readingDays, totalDays, longestStreak, bestMonth, pagesPerReadingDay, thisMonth };
  }

  /** Retrocede `months` meses conservando el día, ajustándolo si el mes destino es más corto. */
  private _shiftMonths(date: Date, months: number): Date {
    const target = new Date(date.getFullYear(), date.getMonth() - months, 1);
    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    target.setDate(Math.min(date.getDate(), lastDay));
    return target;
  }

  private _level(count: number): 0 | 1 | 2 | 3 | 4 {
    if (count < LEVEL_MIN_PAGES[0]) return 0;
    if (count < LEVEL_MIN_PAGES[1]) return 1;
    if (count < LEVEL_MIN_PAGES[2]) return 2;
    if (count < LEVEL_MIN_PAGES[3]) return 3;
    return 4;
  }

  private _toDateString(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
