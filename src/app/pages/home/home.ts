import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { YearlyReading } from '@shared/models';
import { BookService } from '../../services/book.service';
import { MangaVolumeService } from '../../services/manga-volume.service';
import { YearlyReadingService } from '../../services/yearly-reading.service';
import { ReadingProgressService } from '../../services/reading-progress.service';
import { HomeStats } from './components/home-stats/home-stats';
import { LastAdditions } from './components/last-additions/last-additions';
import { LastReadings } from './components/last-readings/last-readings';
import { ReadingActivity } from './components/reading-activity/reading-activity';
import { ReadingNow } from './components/reading-now/reading-now';
import { fromBook, fromMangaVolume, HomeItem } from './models/home-item.model';
import { toDateString } from './utils/date.utils';

/** Nº máximo de lecturas finalizadas ("Últimas lecturas") en escritorio. */
const DESKTOP_RECENT_COUNT = 5;
/** Nº máximo de entradas por sección en móvil. */
const MOBILE_RECENT_COUNT = 4;
/**
 * Nº máximo de "Últimas incorporaciones" en escritorio. Calculado para que la columna lateral
 * llene el alto de la columna principal (a 1920px de ancho) sin dejar hueco vacío debajo.
 */
const DESKTOP_ADDITIONS_COUNT = 7;

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    ReadingActivity,
    HomeStats,
    ReadingNow,
    LastReadings,
    LastAdditions,
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

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  /** true cuando la carga ha terminado sin error. */
  protected readonly ready = computed(() => !this.loading() && !this.error());

  /** true por debajo de 768px, igual que el resto de la app (navbar, gestión, etc.). */
  protected readonly isMobile = toSignal(
    inject(BreakpointObserver)
      .observe('(max-width: 767px)')
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  /** Nº de lecturas finalizadas a mostrar según el tamaño de pantalla actual. */
  protected readonly recentCount = computed(() =>
    this.isMobile() ? MOBILE_RECENT_COUNT : DESKTOP_RECENT_COUNT,
  );

  /** Nº de incorporaciones a mostrar según el tamaño de pantalla actual. */
  protected readonly additionsCount = computed(() =>
    this.isMobile() ? MOBILE_RECENT_COUNT : DESKTOP_ADDITIONS_COUNT,
  );

  /**
   * Panel de actividad. De su mapa de calor se lee el resumen (días con lectura, racha más
   * larga, mes con más páginas, media por día y páginas de este mes) para mostrarlo en
   * "En cifras" en móvil, donde el resumen bajo el mapa no se pinta.
   */
  private readonly _activityPanel = viewChild(ReadingActivity);
  protected readonly heatmapSummary = computed(() => this._activityPanel()?.summary() ?? null);

  /** Todas las lecturas anuales (una sola consulta): de aquí salen "Leyendo", "Últimas lecturas" y las estadísticas. */
  private readonly _readings = signal<YearlyReading[]>([]);

  /** Lecturas finalizadas (con fecha de fin), la más reciente primero. */
  protected readonly finishedReadings = computed(() =>
    this._readings()
      .filter((r) => !!r.endDate)
      .sort((a, b) => (b.endDate ?? '').localeCompare(a.endDate ?? '') || b.id - a.id),
  );

  /** Lecturas actualmente en curso (sin fecha de fin), más recientes primero. Sin límite. */
  protected readonly readingNow = computed(() =>
    this._readings()
      .filter((r) => !r.endDate)
      .sort((a, b) => b.id - a.id),
  );

  /** Último porcentaje de avance registrado para cada lectura en curso, por id. */
  protected readonly progressByReadingId = signal<Record<number, number>>({});

  /** Páginas leídas hoy en cada lectura en curso, por id (las que no tienen avances hoy no aparecen). */
  protected readonly pagesTodayByReadingId = signal<Record<number, number>>({});

  /** Libros y tomos de manga de la biblioteca. */
  protected readonly additions = signal<HomeItem[]>([]);

  ngOnInit(): void {
    this._loadData();
  }

  /** Recarga las lecturas y su avance sin pasar por el estado de carga (sin spinner). */
  protected async refreshReadings(): Promise<void> {
    try {
      this._readings.set(await this._yearlyReadingSrv.getAll());
      await this._loadProgress();
    } catch (err) {
      console.error(err);
    }
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
      this.additions.set([...books.map(fromBook), ...mangaVolumes.map(fromMangaVolume)]);
      await this._loadProgress();
    } catch (err) {
      this.error.set('No se pudo cargar la información de la biblioteca. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Último porcentaje de avance de cada lectura en curso (barra de progreso de su tarjeta) y
   * páginas leídas hoy en cada una. Se piden juntos y en paralelo (una consulta cada uno para
   * todas las lecturas), de modo que la tarjeta se pinta completa de una vez y no "salta".
   */
  private async _loadProgress(): Promise<void> {
    const ids = this.readingNow().map((r) => r.id);
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
}
