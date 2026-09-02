import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
import { LibraryDataDisplay } from './components/library-data-display/library-data-display';
import { LibraryDeleteDialog, LibraryDeleteDialogData } from './components/library-delete-dialog/library-delete-dialog';
import {
  LibraryFormModal,
  LibraryFormModalData,
  LibraryFormModalResult,
} from './components/library-form-modal/library-form-modal';
import { LibrarySearch } from './components/library-search/library-search';
import { AuthorService } from '../../services/author.service';
import { BookSerieService } from '../../services/book-serie.service';
import { BookService } from '../../services/book.service';
import { EditorialService } from '../../services/editorial.service';
import { MangaService } from '../../services/manga.service';
import { MangaVolumeService } from '../../services/manga-volume.service';
import { Author, BookSerie, Editorial, Manga } from '@shared/models';
import { FORM_MODE } from './constants/library-form.constants';
import { SORT_FIELD, TYPE } from './constants/library.consants';
import { DEFAULT_LIBRARY_FILTERS, LibraryFilters } from './models/library-filters.model';
import { fromBook, fromMangaVolume, LibraryItem } from './models/library-item.model';
import { READING_STATUS } from '@shared/constants';

@Component({
  imports: [LibraryDataDisplay, LibrarySearch, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  selector: 'app-library',
  styleUrl: './library.css',
  templateUrl: './library.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Library implements OnInit {
  private readonly _bookSrv = inject(BookService);
  private readonly _mangaVolumeSrv = inject(MangaVolumeService);
  private readonly _mangaSrv = inject(MangaService);
  private readonly _authorSrv = inject(AuthorService);
  private readonly _editorialSrv = inject(EditorialService);
  private readonly _bookSerieSrv = inject(BookSerieService);
  private readonly _dialog = inject(MatDialog);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  private readonly books = signal<LibraryItem[]>([]);
  private readonly mangaVolumes = signal<LibraryItem[]>([]);
  protected readonly authors = signal<Author[]>([]);
  protected readonly series = signal<BookSerie[]>([]);
  protected readonly editorials = signal<Editorial[]>([]);
  protected readonly mangas = signal<Manga[]>([]);

  protected readonly filters = signal<LibraryFilters>(DEFAULT_LIBRARY_FILTERS);

  protected readonly TYPE = TYPE;

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

  // ---------- Alta ----------

  protected openCreate(): void {
    this.openFormModal({ mode: FORM_MODE.ALTA, type: this.filters().type });
  }

  // ---------- Ver detalle (desde el menú contextual) ----------

  protected onViewDetail(item: LibraryItem): void {
    this.openFormModal({ mode: FORM_MODE.DETALLE, type: this.filters().type, itemId: item.id });
  }

  private openFormModal(data: LibraryFormModalData): void {
    const ref = this._dialog.open<LibraryFormModal, LibraryFormModalData, LibraryFormModalResult>(
      LibraryFormModal,
      {
        data,
        width: '760px',
        maxWidth: '95vw',
        autoFocus: false,
      },
    );
    ref.afterClosed().subscribe((result) => {
      if (result?.saved) this._loadItems();
    });
  }

  // ---------- Eliminar (desde el menú contextual) ----------

  protected async onDeleteItem(item: LibraryItem): Promise<void> {
    const type = this.filters().type;

    const dialogData: LibraryDeleteDialogData = {
      type,
      title: item.title,
      authorNames: item.authors.length ? item.authors.map((a) => a.name).join(', ') : 'Autor desconocido',
      editorialName: item.editorial?.name ?? '—',
      volumeNumber: type === TYPE.MANGA ? item.serieVolume : undefined,
      notes: type === TYPE.MANGA ? item.notes : undefined,
    };

    const ref = this._dialog.open<LibraryDeleteDialog, LibraryDeleteDialogData, boolean>(
      LibraryDeleteDialog,
      { data: dialogData, width: '480px', maxWidth: '95vw' },
    );

    const confirmed = await firstValueFrom(ref.afterClosed());
    if (!confirmed) return;

    try {
      if (type === TYPE.BOOK) {
        await this._bookSrv.remove(item.id);
      } else {
        await this._mangaVolumeSrv.remove(item.id);
      }
      await this._loadItems();
    } catch (err) {
      this.error.set('No se ha podido eliminar el elemento. Inténtalo de nuevo.');
      console.error(err);
    }
  }

  // ---------- Carga de datos ----------

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
      const [books, mangaVolumes, mangas] = await Promise.all([
        this._bookSrv.getAll(),
        this._mangaVolumeSrv.getAll(),
        this._mangaSrv.getAll(),
      ]);
      this.mangas.set(mangas);
      const mangaTitleById = new Map(mangas.map((manga) => [manga.id, manga.title]));
      this.books.set(books.map(fromBook));
      this.mangaVolumes.set(
        mangaVolumes.map((volume) => fromMangaVolume(volume, mangaTitleById.get(volume.mangaId))),
      );
    } catch (err) {
      this.error.set('No se pudo cargar la biblioteca. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  protected async onMarkFinished(item: LibraryItem): Promise<void> {
    const type = this.filters().type;
    try {
      if (type === TYPE.BOOK) {
        const book = await this._bookSrv.getById(item.id);
        if (!book) return;
        await this._bookSrv.update(item.id, {
          title: book.title,
          authorIds: book.authors.map((a) => a.id),
          readingStatus: READING_STATUS.FINISHED,
          releaseDate: book.releaseDate ? new Date(book.releaseDate) : undefined,
          coverImageUrl: book.coverImageUrl,
          adquisitionDate: book.adquisitionDate ? new Date(book.adquisitionDate) : undefined,
          startDate: book.startDate ? new Date(book.startDate) : undefined,
          finishDate: book.finishDate ? new Date(book.finishDate) : new Date(),
          notes: book.notes,
          language: book.language,
          editorialId: book.editorial.id,
          serieId: book.serie?.id,
          serieVolume: book.serieVolume,
          genres: book.genres,
        });
      } else {
        const volume = await this._mangaVolumeSrv.getById(item.id);
        if (!volume) return;
        await this._mangaVolumeSrv.update(item.id, {
          title: volume.title,
          authorIds: volume.authors.map((a) => a.id),
          mangaId: volume.mangaId,
          volumeNumber: volume.volumeNumber,
          readingStatus: READING_STATUS.FINISHED,
          releaseDate: volume.releaseDate ? new Date(volume.releaseDate) : undefined,
          coverImageUrl: volume.coverImageUrl,
          adquisitionDate: volume.adquisitionDate ? new Date(volume.adquisitionDate) : undefined,
          startDate: volume.startDate ? new Date(volume.startDate) : undefined,
          finishDate: volume.finishDate ? new Date(volume.finishDate) : new Date(),
          notes: volume.notes,
          language: volume.language,
          editorialId: volume.editorial.id,
        });
      }
      await this._loadItems();
    } catch (err) {
      this.error.set('No se ha podido marcar como leído.');
      console.error(err);
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
    case SORT_FIELD.SERIE:
      return (a.serieTitle ?? '').localeCompare(b.serieTitle ?? '');
    case SORT_FIELD.VOLUME_NUMBER:
      return (a.serieVolume ?? 0) - (b.serieVolume ?? 0);
    case SORT_FIELD.FINISH_DATE:
      return (a.finishDate ?? '').localeCompare(b.finishDate ?? '');
    case SORT_FIELD.ADQUISITION_DATE:
      return (a.adquisitionDate ?? '').localeCompare(b.adquisitionDate ?? '');
    case SORT_FIELD.RELEASE_DATE:
      return (a.releaseDate ?? '').localeCompare(b.releaseDate ?? '');
    case SORT_FIELD.NOTES:
      return (a.notes ?? '').localeCompare(b.notes ?? '');
    default:
      return 0;
  }
}