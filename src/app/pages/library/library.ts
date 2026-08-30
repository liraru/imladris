import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LibraryDataDisplay } from './components/library-data-display/library-data-display';
import { LibrarySearch } from './components/library-search/library-search';
import { AuthorService } from '../../services/author.service';
import { BookSerieService } from '../../services/book-serie.service';
import { BookService } from '../../services/book.service';
import { EditorialService } from '../../services/editorial.service';
import { MangaVolumeService } from '../../services/manga-volume.service';
import { Author, BookSerie, Editorial } from '@shared/models';
import { SORT_FIELD, TYPE } from './constants/library.consants';
import { DEFAULT_LIBRARY_FILTERS, LibraryFilters } from './models/library-filters.model';
import { fromBook, fromMangaVolume, LibraryItem } from './models/library-item.model';

@Component({
  imports: [LibraryDataDisplay, LibrarySearch, MatIconModule, MatProgressSpinnerModule],
  selector: 'app-library',
  styleUrl: './library.css',
  templateUrl: './library.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Library implements OnInit {
  private readonly _bookSrv = inject(BookService);
  private readonly _mangaVolumeSrv = inject(MangaVolumeService);
  private readonly _authorSrv = inject(AuthorService);
  private readonly _editorialSrv = inject(EditorialService);
  private readonly _bookSerieSrv = inject(BookSerieService);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  private readonly books = signal<LibraryItem[]>([]);
  private readonly mangaVolumes = signal<LibraryItem[]>([]);
  protected readonly authors = signal<Author[]>([]);
  protected readonly series = signal<BookSerie[]>([]);
  protected readonly editorials = signal<Editorial[]>([]);

  protected readonly filters = signal<LibraryFilters>(DEFAULT_LIBRARY_FILTERS);

  private readonly sourceItems = computed<LibraryItem[]>(() =>
    this.filters().type === TYPE.BOOK ? this.books() : this.mangaVolumes(),
  );

  protected readonly finishYears = computed(() => extractYears(this.sourceItems(), (i) => i.finishDate));
  protected readonly adquisitionYears = computed(() =>
    extractYears(this.sourceItems(), (i) => i.adquisitionDate),
  );
  protected readonly displayItems = computed(() => applyFilters(this.sourceItems(), this.filters()));

  ngOnInit(): void {
    this._loadReferenceData();
    this._loadItems();
  }

  protected onFiltersChange(filters: LibraryFilters): void {
    this.filters.set(filters);
  }

  private async _loadReferenceData(): Promise<void> {
    try {
      const [authors, editorials, series] = await Promise.all([
        this._authorSrv.getAll(),
        this._editorialSrv.getAll(),
        this._bookSerieSrv.getAll(),
      ]);
      this.authors.set(authors);
      this.editorials.set(editorials);
      this.series.set(series);
    } catch (err) {
      console.error(err);
    }
  }

  private async _loadItems(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const [books, mangaVolumes] = await Promise.all([
        this._bookSrv.getAll(),
        this._mangaVolumeSrv.getAll(),
      ]);
      this.books.set(books.map(fromBook));
      this.mangaVolumes.set(mangaVolumes.map(fromMangaVolume));
    } catch (err) {
      this.error.set('No se pudo cargar la biblioteca. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}

function extractYears(items: LibraryItem[], pick: (i: LibraryItem) => string | undefined): number[] {
  const years = new Set<number>();
  for (const item of items) {
    const date = pick(item);
    if (date) years.add(Number(date.slice(0, 4)));
  }
  return [...years].sort((a, b) => b - a);
}

function applyFilters(items: LibraryItem[], filters: LibraryFilters): LibraryItem[] {
  const title = filters.title.trim().toLowerCase();

  let result = items.filter((item) => {
    if (title && !item.title.toLowerCase().includes(title)) return false;
    if (filters.authorId && !item.authors.some((a) => a.id === filters.authorId)) return false;
    if (filters.serieId && item.serieId !== filters.serieId) return false;
    if (filters.editorialId && item.editorial.id !== filters.editorialId) return false;
    if (filters.readingStatus && item.readingStatus !== filters.readingStatus) return false;
    if (filters.finishYear && Number(item.finishDate?.slice(0, 4)) !== filters.finishYear) return false;
    if (filters.adquisitionYear && Number(item.adquisitionDate?.slice(0, 4)) !== filters.adquisitionYear)
      return false;
    return true;
  });

  if (filters.sortBy.length > 0) {
    result = [...result].sort((a, b) => {
      for (const field of filters.sortBy) {
        const diff = compareByField(a, b, field);
        if (diff !== 0) return filters.sortDirection === 'asc' ? diff : -diff;
      }
      return 0;
    });
  }

  return result;
}

function compareByField(a: LibraryItem, b: LibraryItem, field: SORT_FIELD): number {
  switch (field) {
    case SORT_FIELD.TITLE:
      return a.title.localeCompare(b.title);
    case SORT_FIELD.AUTHOR:
      return (a.authors[0]?.name ?? '').localeCompare(b.authors[0]?.name ?? '');
    case SORT_FIELD.FINISH_DATE:
      return (a.finishDate ?? '').localeCompare(b.finishDate ?? '');
    case SORT_FIELD.ADQUISITION_DATE:
      return (a.adquisitionDate ?? '').localeCompare(b.adquisitionDate ?? '');
    case SORT_FIELD.RELEASE_DATE:
      return (a.releaseDate ?? '').localeCompare(b.releaseDate ?? '');
    default:
      return 0;
  }
}