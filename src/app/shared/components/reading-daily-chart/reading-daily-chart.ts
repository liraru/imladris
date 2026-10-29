import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { YearlyReading } from '@shared/models';
import { AuthService } from '../../../services/auth.service';
import { ReadingProgressService } from '../../../services/reading-progress.service';

interface ChartDay {
  /** yyyy-MM-dd */
  date: string;
  pages: number;
  /** Altura de la barra, 0-100 (relativa al día con más páginas). */
  heightPct: number;
}

/** Altura mínima (en %) de una barra con páginas, para que un día con pocas páginas siga viéndose. */
const MIN_BAR_PCT = 4;

/** Ancho mínimo y máximo (px CSS) de cada columna, y separación entre columnas (px CSS). */
const MIN_COL_WIDTH = 6;
const MAX_COL_WIDTH = 28;
const COL_GAP = 2;

function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** yyyy-MM-dd → Date a medianoche en hora local (evita el desfase de `new Date('yyyy-MM-dd')`, que es UTC). */
function parseDate(value: string): Date {
  const [y, m, d] = value.slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d);
}

@Component({
  selector: 'app-reading-daily-chart',
  imports: [DatePipe, DecimalPipe, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './reading-daily-chart.html',
  styleUrl: './reading-daily-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingDailyChart {
  private readonly _service = inject(ReadingProgressService);
  private readonly _authService = inject(AuthService);

  /** Lectura de la que se pinta el gráfico (en curso en la home; también finalizada en su ficha de detalle). */
  readonly reading = input.required<YearlyReading>();

  protected readonly loading = signal(true);

  /** Los tooltips de páginas leídas solo se muestran si el usuario está logado. */
  protected readonly tooltipsDisabled = computed(() => !this._authService.isAdmin());

  /** Páginas avanzadas por día (yyyy-MM-dd) de esta lectura. */
  private readonly _pagesByDay = signal<Record<string, number>>({});

  private readonly _scroller = viewChild<ElementRef<HTMLElement>>('scroller');

  /** Ancho disponible del contenedor (px CSS) y densidad de píxeles, medidos con ResizeObserver. */
  private readonly _containerWidth = signal(0);
  private readonly _dpr = signal(1);

  /** Posición del scroll horizontal (px), para saber qué días se ven en cada momento. */
  private readonly _scrollLeft = signal(0);

  /** Contador de peticiones: descarta respuestas antiguas si llegan tarde (cambio de lectura o de avances). */
  private _requestId = 0;

  /** La lectura ya está finalizada: el gráfico termina en su fecha de fin en vez de en hoy. */
  protected readonly isFinished = computed(() => !!this.reading().endDate);

  /**
   * Un día por columna, desde la fecha de inicio (o el primer avance, si es anterior) hasta hoy
   * (lectura en curso) o hasta la fecha de fin (lectura finalizada).
   */
  protected readonly days = computed<ChartDay[]>(() => {
    const pagesByDay = this._pagesByDay();
    const recordedDates = Object.keys(pagesByDay).sort();
    if (recordedDates.length === 0) return [];

    const startDate = this.reading().startDate;
    const firstDate =
      startDate && startDate.slice(0, 10) < recordedDates[0]
        ? startDate.slice(0, 10)
        : recordedDates[0];

    const endDate = this.reading().endDate;
    let end: Date;
    if (endDate) {
      // Si hubiera algún avance posterior a la fecha de fin, no se deja fuera del gráfico.
      const lastRecorded = recordedDates[recordedDates.length - 1];
      const endStr = endDate.slice(0, 10);
      end = parseDate(endStr > lastRecorded ? endStr : lastRecorded);
    } else {
      end = new Date();
      end.setHours(0, 0, 0, 0);
    }

    const cursor = parseDate(firstDate);
    const result: ChartDay[] = [];
    while (cursor <= end) {
      const date = toDateString(cursor);
      result.push({ date, pages: pagesByDay[date] ?? 0, heightPct: 0 });
      cursor.setDate(cursor.getDate() + 1);
    }

    const max = Math.max(0, ...result.map((d) => d.pages));
    for (const day of result) {
      day.heightPct = day.pages > 0 && max > 0 ? Math.max(MIN_BAR_PCT, (day.pages / max) * 100) : 0;
    }
    return result;
  });

  /**
   * Separación entre columnas (px CSS), ajustada a un nº entero de píxeles de dispositivo para que
   * el navegador no la redondee de forma distinta entre barras.
   */
  protected readonly gap = computed(() => {
    const dpr = this._dpr();
    return Math.max(1, Math.round(COL_GAP * dpr)) / dpr;
  });

  /**
   * Ancho (px CSS) de cada columna. Se calcula en píxeles de dispositivo ENTEROS: todas las columnas
   * miden `base` y el sobrante se reparte de uno en uno entre ellas, de modo que la separación entre
   * barras es idéntica en todo el gráfico (con anchos fraccionarios el navegador redondea cada borde
   * por separado y los huecos salen de 1, 2 o 3 px).
   * Si ni con el ancho mínimo caben, se usa el mínimo y el gráfico hace scroll horizontal.
   */
  protected readonly colWidths = computed<number[]>(() => {
    const n = this.days().length;
    const width = this._containerWidth();
    const dpr = this._dpr();
    if (n === 0) return [];

    const minDev = Math.round(MIN_COL_WIDTH * dpr);
    const maxDev = Math.round(MAX_COL_WIDTH * dpr);
    const gapDev = Math.max(1, Math.round(COL_GAP * dpr));

    // Aún sin medir el contenedor: ancho mínimo.
    if (width <= 0) return Array.from({ length: n }, () => minDev / dpr);

    const available = Math.floor(width * dpr) - gapDev * (n - 1);
    let base = Math.floor(available / n);
    let extra = available - base * n;

    if (base <= minDev) {
      base = minDev;
      extra = 0;
    } else if (base >= maxDev) {
      base = maxDev;
      extra = 0;
    }

    return Array.from(
      { length: n },
      (_, i) => (base + Math.floor(((i + 1) * extra) / n) - Math.floor((i * extra) / n)) / dpr,
    );
  });

  /**
   * Primer y último día visibles (índices). Sin scroll horizontal son todos; con scroll se deducen
   * de la posición (las columnas miden todas lo mismo cuando hay desbordamiento).
   */
  private readonly _visibleRange = computed(() => {
    const n = this.days().length;
    if (n === 0) return { first: 0, last: -1 };

    const widths = this.colWidths();
    const gap = this.gap();
    const containerWidth = this._containerWidth();
    const total = widths.reduce((sum, w) => sum + w, 0) + gap * (n - 1);

    if (containerWidth <= 0 || total <= containerWidth + 0.5) {
      return { first: 0, last: n - 1 };
    }

    const pitch = widths[0] + gap;
    const scrollLeft = this._scrollLeft();
    const first = Math.min(n - 1, Math.max(0, Math.floor(scrollLeft / pitch)));
    const last = Math.min(
      n - 1,
      Math.max(first, Math.ceil((scrollLeft + containerWidth) / pitch) - 1),
    );
    return { first, last };
  });

  /** Fecha de la izquierda de la leyenda: primer día visible. */
  protected readonly axisStartDate = computed(
    () => this.days()[this._visibleRange().first]?.date ?? '',
  );

  /** Fecha de la derecha de la leyenda: último día visible. */
  protected readonly axisEndDate = computed(
    () => this.days()[this._visibleRange().last]?.date ?? '',
  );

  /** El último día visible es el final del gráfico y la lectura sigue en curso: se muestra "Hoy". */
  protected readonly axisEndIsToday = computed(
    () => !this.isFinished() && this._visibleRange().last === this.days().length - 1,
  );

  protected readonly maxPages = computed(() => Math.max(0, ...this.days().map((d) => d.pages)));
  protected readonly totalPages = computed(() => this.days().reduce((sum, d) => sum + d.pages, 0));

  constructor() {
    // Recarga al cambiar de lectura y cada vez que se registra/edita/borra un avance
    // desde cualquier punto de la app.
    effect(() => {
      const reading = this.reading();
      this._service.progressChanged();
      void this._load(reading.id);
    });

    // Mide el contenedor (y la densidad de píxeles) al pintarse y cada vez que cambia de tamaño o de zoom.
    effect((onCleanup) => {
      const scroller = this._scroller()?.nativeElement;
      if (!scroller) return;

      const measure = () => {
        this._dpr.set(window.devicePixelRatio || 1);
        this._containerWidth.set(scroller.clientWidth);
      };
      measure();

      const observer = new ResizeObserver(measure);
      observer.observe(scroller);
      onCleanup(() => observer.disconnect());
    });

    // Tras pintar, deja visible el final (hoy / fecha de fin) cuando el gráfico es más ancho que su contenedor.
    afterRenderEffect(() => {
      this.days();
      this.colWidths();
      const scroller = this._scroller()?.nativeElement;
      if (scroller) {
        scroller.scrollLeft = scroller.scrollWidth;
        this._scrollLeft.set(scroller.scrollLeft);
      }
    });
  }

  protected onScroll(scroller: HTMLElement): void {
    this._scrollLeft.set(scroller.scrollLeft);
  }

  protected dayTooltip(day: ChartDay): string {
    return day.pages > 0
      ? `${day.pages} página${day.pages === 1 ? '' : 's'} leída${day.pages === 1 ? '' : 's'}`
      : 'Sin páginas leídas';
  }

  private async _load(readingId: number): Promise<void> {
    const requestId = ++this._requestId;
    try {
      const records = await this._service.getByReadingId(readingId);
      if (requestId !== this._requestId) return;

      const pagesByDay: Record<string, number> = {};
      for (const record of records) {
        const date = record.recordDate.slice(0, 10);
        pagesByDay[date] = (pagesByDay[date] ?? 0) + record.pagesAdvanced;
      }
      this._pagesByDay.set(pagesByDay);
    } catch (err) {
      if (requestId !== this._requestId) return;
      console.error(err);
      this._pagesByDay.set({});
    } finally {
      if (requestId === this._requestId) this.loading.set(false);
    }
  }
}
