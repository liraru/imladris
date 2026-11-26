import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgTemplateOutlet, formatDate, formatNumber } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { YearlyReading } from '@shared/models';
import { ReadingProgressService } from '../../../../services/reading-progress.service';
import { HeatmapSummary } from '../../models/heatmap-summary.model';
import { HOME_ITEM_TYPE, HomeItem } from '../../models/home-item.model';
import { toDateString } from '../../utils/date.utils';

const NO_VALUE = '—';

interface HomeStat {
  icon: string;
  label: string;
  value: string;
  detail?: string;
  tooltip?: string;
}

interface YearActivity {
  /** Páginas leídas en el último año. */
  pagesYear: number;
  /** Días seguidos leyendo hasta hoy (o hasta ayer, si hoy aún no se ha registrado nada). */
  streak: number;
}

/** Días consecutivos con páginas leídas hasta hoy; si hoy todavía no hay registro, la racha sigue viva desde ayer. */
function currentStreak(pagesByDay: Record<string, number>, today: Date): number {
  const cursor = new Date(today);
  if ((pagesByDay[toDateString(cursor)] ?? 0) <= 0) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  while ((pagesByDay[toDateString(cursor)] ?? 0) > 0) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

@Component({
  selector: 'app-home-stats',
  imports: [NgTemplateOutlet, MatIconModule, MatTooltipModule],
  templateUrl: './home-stats.html',
  styleUrl: './home-stats.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // El propio host es el panel (clase global definida en _home-shared.scss).
  host: { class: 'home__panel' },
})
export class HomeStats {
  private readonly _readingProgressSrv = inject(ReadingProgressService);
  private readonly _locale = inject(LOCALE_ID);

  /** true por debajo de 768px (lo decide Home). */
  readonly isMobile = input(false);
  /** true cuando Home ha terminado de cargar sin error. */
  readonly ready = input(false);
  /** Lecturas finalizadas, la más reciente primero. */
  readonly finishedReadings = input<YearlyReading[]>([]);
  /** Libros y tomos de manga de la biblioteca. */
  readonly additions = input<HomeItem[]>([]);
  /** Resumen del mapa de calor (null mientras no ha cargado). */
  readonly heatmapSummary = input<HeatmapSummary | null>(null);

  /** Móvil: true cuando el panel está desplegado (muestra todas las cifras). */
  protected readonly statsExpanded = signal(false);

  private readonly _activity = signal<YearActivity | null>(null);

  /** Autor con más lecturas finalizadas. */
  private readonly _topAuthor = computed(() => {
    const counts = new Map<string, number>();
    for (const reading of this.finishedReadings()) {
      for (const author of reading.authors) {
        const name = author.trim();
        if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
      }
    }

    let top: { name: string; count: number } | null = null;
    for (const [name, count] of counts) {
      if (!top || count > top.count) top = { name, count };
    }
    return top;
  });

  /** Cifras propias de la home (las que no salen del mapa de calor), cada una con su clave. */
  private readonly _homeStats = computed(() => {
    const ready = this.ready();
    const activity = this._activity();
    const year = new Date().getFullYear();

    const finishedThisYear = this.finishedReadings().filter((r) =>
      (r.endDate ?? '').startsWith(String(year)),
    ).length;

    const additions = this.additions();
    const books = additions.filter((item) => item.type === HOME_ITEM_TYPE.BOOK).length;
    const mangaVolumes = additions.length - books;

    const topAuthor = this._topAuthor();
    const streak = activity?.streak ?? 0;

    return {
      readThisYear: {
        icon: 'menu_book',
        label: `Leídos en ${year}`,
        value: ready ? this._format(finishedThisYear) : NO_VALUE,
      },
      pagesLastYear: {
        icon: 'description',
        label: 'Páginas · último año',
        value: activity ? this._format(activity.pagesYear) : NO_VALUE,
      },
      streak: {
        icon: 'local_fire_department',
        label: 'Racha actual',
        value: activity ? `${streak} ${streak === 1 ? 'día' : 'días'}` : NO_VALUE,
      },
      library: {
        icon: 'collections_bookmark',
        label: 'En la biblioteca',
        value: ready ? this._format(additions.length) : NO_VALUE,
        detail: ready
          ? `${this._format(books)} libros · ${this._format(mangaVolumes)} tomos de manga`
          : undefined,
      },
      topAuthor: {
        icon: 'person',
        label: 'Autor más leído',
        value: ready && topAuthor ? topAuthor.name : NO_VALUE,
        detail:
          ready && topAuthor
            ? `${topAuthor.count} ${topAuthor.count === 1 ? 'lectura' : 'lecturas'}`
            : undefined,
        tooltip: ready && topAuthor ? topAuthor.name : undefined,
      },
    } satisfies Record<string, HomeStat>;
  });

  /**
   * Cifras del resumen del mapa de calor (las mismas, anuales, que se ven bajo el mapa en
   * escritorio), para el panel en móvil. Mientras el mapa no ha cargado se muestran con "—",
   * así el panel no cambia de alto al llegar los datos.
   */
  private readonly _heatmapStats = computed(() => {
    const summary = this.heatmapSummary();
    const best = summary?.bestMonth ?? null;

    return {
      readingDays: {
        icon: 'event_available',
        label: 'Días con lectura',
        value: summary ? this._format(summary.readingDays) : NO_VALUE,
        detail: summary ? `de ${this._format(summary.totalDays)} días` : undefined,
      },
      longestStreak: {
        icon: 'emoji_events',
        label: 'Racha más larga',
        value: summary
          ? `${this._format(summary.longestStreak)} ${summary.longestStreak === 1 ? 'día' : 'días'}`
          : NO_VALUE,
        detail: summary ? 'consecutivos' : undefined,
      },
      bestMonth: {
        icon: 'calendar_month',
        label: 'Mes con más páginas',
        value: best ? this._formatCapitalized(best.date, 'MMMM') : NO_VALUE,
        detail: best
          ? `${this._format(best.pages)} págs. · ${formatDate(best.date, 'y', this._locale)}`
          : undefined,
      },
      pagesPerDay: {
        icon: 'speed',
        label: 'Media por día',
        value:
          summary && summary.readingDays > 0
            ? `${this._format(summary.pagesPerReadingDay)} págs.`
            : NO_VALUE,
        detail: summary && summary.readingDays > 0 ? 'en días con lectura' : undefined,
      },
      pagesThisMonth: {
        icon: 'auto_stories',
        label: 'Páginas este mes',
        value: summary ? `${this._format(summary.thisMonth.pages)} págs.` : NO_VALUE,
        detail: summary ? this._formatCapitalized(summary.thisMonth.date, 'MMMM y') : undefined,
      },
    } satisfies Record<string, HomeStat>;
  });

  /** Escritorio y tablet: cifras destacadas que acompañan al mapa de calor. */
  protected readonly stats = computed<HomeStat[]>(() => {
    const s = this._homeStats();
    return [s.readThisYear, s.pagesLastYear, s.streak, s.library, s.topAuthor];
  });

  /** Móvil: las tres cifras siempre visibles (con el panel recogido). */
  protected readonly mobilePrimaryStats = computed<HomeStat[]>(() => {
    const s = this._homeStats();
    const h = this._heatmapStats();
    return [s.pagesLastYear, h.pagesThisMonth, s.streak];
  });

  /** Móvil: resto de cifras, solo visibles con el panel desplegado. */
  protected readonly mobileExtraStats = computed<HomeStat[]>(() => {
    const s = this._homeStats();
    const h = this._heatmapStats();
    return [
      s.readThisYear,
      s.library,
      s.topAuthor,
      h.readingDays,
      h.longestStreak,
      h.bestMonth,
      h.pagesPerDay,
    ];
  });

  constructor() {
    // Páginas del último año y racha: se recalculan al registrar/editar/borrar un avance
    // desde cualquier punto de la app, igual que hace el mapa de calor.
    effect(() => {
      this._readingProgressSrv.progressChanged();
      void this._loadActivity();
    });
  }

  /** Móvil: despliega o recoge el panel. */
  protected toggleStats(): void {
    this.statsExpanded.update((expanded) => !expanded);
  }

  private _format(value: number): string {
    return formatNumber(value, this._locale, '1.0-0');
  }

  /** Fecha formateada con la primera letra en mayúscula (p. ej. "Noviembre 2026"). */
  private _formatCapitalized(date: string, format: string): string {
    const text = formatDate(date, format, this._locale);
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /** Páginas leídas en el último año y racha actual, a partir de las páginas avanzadas por día. */
  private async _loadActivity(): Promise<void> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // Mismo rango que el mapa de calor en escritorio: desde mañana del año pasado hasta hoy.
      const start = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate() + 1);

      const pagesByDay = await this._readingProgressSrv.getPagesByDay(toDateString(start));
      const pagesYear = Object.values(pagesByDay).reduce((sum, n) => sum + n, 0);
      this._activity.set({ pagesYear, streak: currentStreak(pagesByDay, today) });
    } catch (err) {
      console.error(err);
    }
  }
}
