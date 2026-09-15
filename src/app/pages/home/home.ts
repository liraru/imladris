import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ROUTES } from '@shared/constants';
import { BookService } from '../../services/book.service';
import { MangaService } from '../../services/manga.service';
import { MangaVolumeService } from '../../services/manga-volume.service';
import { fromBook, fromMangaVolume, HOME_ITEM_TYPE, HomeItem } from './models/home-item.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private readonly _bookSrv = inject(BookService);
  private readonly _mangaVolumeSrv = inject(MangaVolumeService);
  private readonly _mangaSrv = inject(MangaService);

  protected readonly ROUTES = ROUTES;
  protected readonly HOME_ITEM_TYPE = HOME_ITEM_TYPE;

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  private readonly items = signal<HomeItem[]>([]);

  /** Las 3 últimas lecturas finalizadas, más reciente primero. */
  protected readonly lastReadings = computed(() =>
    [...this.items()]
      .filter((item) => !!item.finishDate)
      .sort((a, b) => (b.finishDate ?? '').localeCompare(a.finishDate ?? ''))
      .slice(0, 3),
  );

  /** Las 6 últimas incorporaciones a la biblioteca (libros y tomos de manga), más reciente primero. */
  protected readonly lastAdditions = computed(() =>
    [...this.items()]
      .filter((item) => !!item.adquisitionDate)
      .sort((a, b) => (b.adquisitionDate ?? '').localeCompare(a.adquisitionDate ?? ''))
      .slice(0, 6),
  );

  ngOnInit(): void {
    this._loadItems();
  }

  protected authorNames(item: HomeItem): string {
    return item.authors.length ? item.authors.map((a) => a.name).join(', ') : 'Autor desconocido';
  }

  protected serieLabel(item: HomeItem): string {
    if (!item.serieTitle) return '';
    return item.serieVolume ? `${item.serieTitle} #${item.serieVolume}` : item.serieTitle;
  }

  private async _loadItems(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const [books, mangaVolumes, mangas] = await Promise.all([
        this._bookSrv.getAll(),
        this._mangaVolumeSrv.getAll(),
        this._mangaSrv.getAll(),
      ]);
      const mangaTitleById = new Map(mangas.map((manga) => [manga.id, manga.title]));
      this.items.set([
        ...books.map(fromBook),
        ...mangaVolumes.map((volume) =>
          fromMangaVolume(volume, mangaTitleById.get(volume.mangaId)),
        ),
      ]);
    } catch (err) {
      this.error.set('No se pudo cargar la información de la biblioteca. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}
