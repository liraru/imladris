import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID,
  OnInit,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, map } from 'rxjs';
import {
  DatePipe,
  DecimalPipe,
  NgTemplateOutlet,
  formatDate,
  formatNumber,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ROUTES } from '@shared/constants';
import { YearlyReading } from '@shared/models';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { MangaVolumeService } from '../../services/manga-volume.service';
import { YearlyReadingService } from '../../services/yearly-reading.service';
import { ReadingProgressService } from '../../services/reading-progress.service';
import { ReadingDailyChart } from '../../shared/components/reading-daily-chart/reading-daily-chart';
import { ReadingHeatmap } from '../../shared/components/reading-heatmap/reading-heatmap';
import {
  ReadingProgressFormModal,
  ReadingProgressFormModalData,
} from '../../shared/components/reading-progress-form-modal/reading-progress-form-modal';
import {
  ReadingProgressHistoryModal,
  ReadingProgressHistoryModalData,
} from '../yearly-readings/components/reading-progress-history-modal/reading-progress-history-modal';
import { fromBook, fromMangaVolume, HOME_ITEM_TYPE, HomeItem } from './models/home-item.model';

/** Nº máximo de entradas por sección en escritorio. */
const DESKTOP_RECENT_COUNT = 5;
/** Nº máximo de entradas por sección en móvil. */
const MOBILE_RECENT_COUNT = 4;

const MS_PER_DAY = 86_400_000;
const NO_VALUE = '—';

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

interface HomeStat {
  icon: string;
  label: string;
  value: string;
  detail?: string;
  tooltip?: string;
}

interface ReadingActivity {
  /** Páginas leídas en el último año. */
  pagesYear: number;
  /** Días seguidos leyendo hasta hoy (o hasta ayer, si hoy aún no se ha registrado nada). */
  streak: number;
}

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

/**
 * Normaliza un título para compararlo entre la biblioteca y las lecturas anuales: sin tildes,
 * en minúsculas y sin espacios ni signos ("Atelier of Witch Hat: Ed. Grimorio vol.4" y
 * "Atelier of Witch Hat - Ed. Grimorio - Vol. 4" dan el mismo resultado).
 */
function normalizeTitle(title: string): string {
  const normalized = title
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '');
  return normalized || title.trim().toLowerCase();
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
  selector: 'app-home',
  imports: [
    RouterLink,
    DatePipe,
    DecimalPipe,
    NgTemplateOutlet,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ReadingDailyChart,
    ReadingHeatmap,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private readonly _bookSrv = inject(BookService);
  private readonly _mangaVolumeSrv = inject(MangaVolumeService);
  private readonly _yearlyReadingSrv = inject(YearlyReadingService);
  private readonly _readingProgressSrv = inject(ReadingProgressService);
  private readonly _dialog = inject(MatDialog);
  private readonly _locale = inject(LOCALE_ID);

  protected readonly authService = inject(AuthService);
  protected readonly ROUTES = ROUTES;
  protected readonly HOME_ITEM_TYPE = HOME_ITEM_TYPE;

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  /** true por debajo de 768px, igual que el resto de la app (navbar, gestión, etc.). */
  protected readonly isMobile = toSignal(
    inject(BreakpointObserver)
      .observe('(max-width: 767px)')
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  /**
   * Mapa de calor del panel de actividad. De él se leen las cifras del resumen (días con
   * lectura, racha más larga, mes con más páginas, media por día y páginas de este mes) para
   * mostrarlas en "En cifras" en móvil, donde el resumen bajo el mapa no se pinta.
   */
  private readonly _heatmap = viewChild(ReadingHeatmap);

  /** Móvil: true cuando el panel "En cifras" está desplegado (muestra todas las cifras). */
  protected readonly statsExpanded = signal(false);

  /** Nº de entradas a mostrar por sección según el tamaño de pantalla actual. */
  protected readonly recentCount = computed(() =>
    this.isMobile() ? MOBILE_RECENT_COUNT : DESKTOP_RECENT_COUNT,
  );

  /** Todas las lecturas anuales (una sola consulta): de aquí salen "Leyendo", "Últimas lecturas" y las estadísticas. */
  private readonly _readings = signal<YearlyReading[]>([]);

  /** Lecturas finalizadas (con fecha de fin), la más reciente primero. */
  private readonly _finishedReadings = computed(() =>
    this._readings()
      .filter((r) => !!r.endDate)
      .sort((a, b) => (b.endDate ?? '').localeCompare(a.endDate ?? '') || b.id - a.id),
  );

  /** Últimas lecturas finalizadas, recortadas al nº de entradas del breakpoint actual. */
  protected readonly lastReadingsToShow = computed(() =>
    this._finishedReadings().slice(0, this.recentCount()),
  );

  /** Lecturas actualmente en curso (sin fecha de fin), más recientes primero. Sin límite. */
  private readonly _readingNow = computed(() =>
    this._readings()
      .filter((r) => !r.endDate)
      .sort((a, b) => b.id - a.id),
  );

  /** Último porcentaje de avance registrado para cada lectura en curso, por id. */
  protected readonly progressByReadingId = signal<Record<number, number>>({});

  /** Páginas leídas hoy en cada lectura en curso, por id (las que no tienen avances hoy no aparecen). */
  protected readonly pagesTodayByReadingId = signal<Record<number, number>>({});

  /** Lecturas en curso con porcentaje, páginas leídas, días y fecha estimada de fin ya calculados. */
  protected readonly readingNowView = computed<ReadingNowView[]>(() => {
    const progress = this.progressByReadingId();
    const pagesTodayById = this.pagesTodayByReadingId();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this._readingNow().map((reading) => {
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

  private readonly _additions = signal<HomeItem[]>([]);

  /** Las últimas incorporaciones a la biblioteca (libros y tomos de manga), más reciente primero. */
  protected readonly lastAdditions = computed(() =>
    [...this._additions()]
      .filter((item) => !!item.adquisitionDate)
      .sort((a, b) => (b.adquisitionDate ?? '').localeCompare(a.adquisitionDate ?? ''))
      .slice(0, this.recentCount()),
  );

  /** Títulos normalizados de las lecturas finalizadas, para marcar como "Leído" las incorporaciones. */
  private readonly _readTitles = computed(
    () => new Set(this._finishedReadings().map((r) => normalizeTitle(r.title))),
  );

  private readonly _activity = signal<ReadingActivity | null>(null);

  /** Autor con más lecturas finalizadas. */
  private readonly _topAuthor = computed(() => {
    const counts = new Map<string, number>();
    for (const reading of this._finishedReadings()) {
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
    const ready = !this.loading() && !this.error();
    const activity = this._activity();
    const year = new Date().getFullYear();

    const finishedThisYear = this._finishedReadings().filter((r) =>
      (r.endDate ?? '').startsWith(String(year)),
    ).length;

    const additions = this._additions();
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
   * escritorio), para el panel "En cifras" en móvil. Mientras el mapa no ha cargado se
   * muestran con "—", así el panel no cambia de alto al llegar los datos.
   */
  private readonly _heatmapStats = computed(() => {
    const summary = this._heatmap()?.summary() ?? null;
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

  /** Móvil: las tres cifras siempre visibles en "En cifras" (con el panel recogido). */
  protected readonly mobilePrimaryStats = computed<HomeStat[]>(() => {
    const s = this._homeStats();
    const h = this._heatmapStats();
    return [s.pagesLastYear, h.pagesThisMonth, s.streak];
  });

  /** Móvil: resto de cifras, solo visibles con el panel "En cifras" desplegado. */
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

  ngOnInit(): void {
    this._loadData();
  }

  protected authorNames(item: HomeItem): string {
    return item.authors.length ? item.authors.map((a) => a.name).join(', ') : 'Autor desconocido';
  }

  /**
   * Indica si la incorporación ya se ha leído. Se cruza por título normalizado con las
   * lecturas finalizadas de Lecturas anuales.
   */
  protected isRead(item: HomeItem): boolean {
    return this._readTitles().has(normalizeTitle(item.title));
  }

  /** Móvil: despliega o recoge el panel "En cifras". */
  protected toggleStats(): void {
    this.statsExpanded.update((expanded) => !expanded);
  }

  /** Opción "Añadir" del menú de la tarjeta: abre la modal de registro de avance de la lectura. */
  protected async registerProgress(reading: YearlyReading): Promise<void> {
    if (!this.authService.isAdmin()) return;

    const ref = this._dialog.open(ReadingProgressFormModal, {
      width: '480px',
      disableClose: true,
      data: { reading } satisfies ReadingProgressFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    // Se recargan las lecturas (y no solo el avance): si se ha marcado como completada,
    // la lectura pasa de "Leyendo" a "Últimas lecturas".
    if (saved) await this._refreshReadings();
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
    // completada, así que al cerrarlo se refrescan las lecturas y su porcentaje.
    await this._refreshReadings();
  }

  private _format(value: number): string {
    return formatNumber(value, this._locale, '1.0-0');
  }

  /** Fecha formateada con la primera letra en mayúscula (p. ej. "Noviembre 2026"). */
  private _formatCapitalized(date: string, format: string): string {
    const text = formatDate(date, format, this._locale);
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private async _loadData(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const [readings, books, mangaVolumes] = await Promise.all([
        this._yearlyReadingSrv.getAll(),
        this._bookSrv.getAll(),
        this._mangaVolumeSrv.getAll(),
      ]);
      this._readings.set(readings);
      this._additions.set([...books.map(fromBook), ...mangaVolumes.map(fromMangaVolume)]);
      await this._loadProgress();
    } catch (err) {
      this.error.set('No se pudo cargar la información de la biblioteca. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  /** Recarga las lecturas y su avance sin pasar por el estado de carga (sin spinner). */
  private async _refreshReadings(): Promise<void> {
    try {
      this._readings.set(await this._yearlyReadingSrv.getAll());
      await this._loadProgress();
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Último porcentaje de avance de cada lectura en curso (barra de progreso de su tarjeta) y
   * páginas leídas hoy en cada una. Se piden juntos y en paralelo (una consulta cada uno para
   * todas las lecturas), de modo que la tarjeta se pinta completa de una vez y no "salta".
   */
  private async _loadProgress(): Promise<void> {
    const ids = this._readingNow().map((r) => r.id);
    if (ids.length === 0) {
      this.progressByReadingId.set({});
      this.pagesTodayByReadingId.set({});
      return;
    }

    const [percentages, pagesToday] = await Promise.all([
      this._readingProgressSrv.getLatestPercentages(ids),
      this._readingProgressSrv.getPagesOnDateByReading(ids, toDateString(new Date())),
    ]);
    this.progressByReadingId.set(percentages);
    this.pagesTodayByReadingId.set(pagesToday);
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
