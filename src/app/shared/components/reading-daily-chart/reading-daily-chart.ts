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

  /** Lectura en curso de la que se pinta el gráfico. */
  readonly reading = input.required<YearlyReading>();

  protected readonly loading = signal(true);

  /** Páginas avanzadas por día (yyyy-MM-dd) de esta lectura. */
  private readonly _pagesByDay = signal<Record<string, number>>({});

  private readonly _scroller = viewChild<ElementRef<HTMLElement>>('scroller');

  /** Contador de peticiones: descarta respuestas antiguas si llegan tarde (cambio de lectura o de avances). */
  private _requestId = 0;

  /** Un día por columna, desde la fecha de inicio (o el primer avance, si es anterior) hasta hoy. */
  protected readonly days = computed<ChartDay[]>(() => {
    const pagesByDay = this._pagesByDay();
    const recordedDates = Object.keys(pagesByDay).sort();
    if (recordedDates.length === 0) return [];

    const startDate = this.reading().startDate;
    const firstDate =
      startDate && startDate.slice(0, 10) < recordedDates[0]
        ? startDate.slice(0, 10)
        : recordedDates[0];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cursor = parseDate(firstDate);
    const result: ChartDay[] = [];
    while (cursor <= today) {
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

  protected readonly maxPages = computed(() => Math.max(0, ...this.days().map((d) => d.pages)));
  protected readonly totalPages = computed(() => this.days().reduce((sum, d) => sum + d.pages, 0));
  protected readonly firstDate = computed(() => this.days()[0]?.date ?? '');

  constructor() {
    // Recarga al cambiar de lectura y cada vez que se registra/edita/borra un avance
    // desde cualquier punto de la app.
    effect(() => {
      const reading = this.reading();
      this._service.progressChanged();
      void this._load(reading.id);
    });

    // Tras pintar, deja visible el final (hoy) cuando el gráfico es más ancho que su contenedor.
    afterRenderEffect(() => {
      this.days();
      const scroller = this._scroller()?.nativeElement;
      if (scroller) scroller.scrollLeft = scroller.scrollWidth;
    });
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
