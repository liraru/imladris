import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ROUTES } from '@shared/constants';
import { YearlyReading } from '@shared/models';
import { BookService } from '../../services/book.service';
import { MangaVolumeService } from '../../services/manga-volume.service';
import { YearlyReadingService } from '../../services/yearly-reading.service';
import { fromBook, fromMangaVolume, HOME_ITEM_TYPE, HomeItem } from './models/home-item.model';

/** Nº máximo de entradas por sección en escritorio. */
const DESKTOP_RECENT_COUNT = 5;
/** Nº máximo de entradas por sección en móvil. */
const MOBILE_RECENT_COUNT = 4;

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private readonly _bookSrv = inject(BookService);
  private readonly _mangaVolumeSrv = inject(MangaVolumeService);
  private readonly _yearlyReadingSrv = inject(YearlyReadingService);

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

  /** Nº de entradas a mostrar por sección según el tamaño de pantalla actual. */
  protected readonly recentCount = computed(() =>
    this.isMobile() ? MOBILE_RECENT_COUNT : DESKTOP_RECENT_COUNT,
  );

  /**
   * Últimas lecturas finalizadas (hasta DESKTOP_RECENT_COUNT), provienen de Lecturas
   * anuales, ya ordenadas por el servicio. Se piden siempre al máximo de escritorio
   * para no volver a llamar al servicio al cambiar de breakpoint; el recorte a mostrar
   * se hace en `lastReadingsToShow`.
   */
  protected readonly lastReadings = signal<YearlyReading[]>([]);

  /** Últimas lecturas recortadas al nº de entradas correspondiente al breakpoint actual. */
  protected readonly lastReadingsToShow = computed(() =>
    this.lastReadings().slice(0, this.recentCount()),
  );

  /** Lecturas actualmente en curso (sin fecha de fin), más recientes primero. Sin límite. */
  protected readonly readingNow = signal<YearlyReading[]>([]);

  private readonly _additions = signal<HomeItem[]>([]);

  /** Las últimas incorporaciones a la biblioteca (libros y tomos de manga), más reciente primero. */
  protected readonly lastAdditions = computed(() =>
    [...this._additions()]
      .filter((item) => !!item.adquisitionDate)
      .sort((a, b) => (b.adquisitionDate ?? '').localeCompare(a.adquisitionDate ?? ''))
      .slice(0, this.recentCount()),
  );

  ngOnInit(): void {
    this._loadData();
  }

  protected authorNames(item: HomeItem): string {
    return item.authors.length ? item.authors.map((a) => a.name).join(', ') : 'Autor desconocido';
  }

  private async _loadData(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const [readings, readingNow, books, mangaVolumes] = await Promise.all([
        this._yearlyReadingSrv.getRecent(DESKTOP_RECENT_COUNT),
        this._yearlyReadingSrv.getInProgress(),
        this._bookSrv.getAll(),
        this._mangaVolumeSrv.getAll(),
      ]);
      this.lastReadings.set(readings);
      this.readingNow.set(readingNow);
      this._additions.set([...books.map(fromBook), ...mangaVolumes.map(fromMangaVolume)]);
    } catch (err) {
      this.error.set('No se pudo cargar la información de la biblioteca. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}
