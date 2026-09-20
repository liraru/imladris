import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { firstValueFrom } from 'rxjs';
import { LibraryDataDisplay } from './components/library-data-display/library-data-display';
import {
  LibraryDeleteDialog,
  LibraryDeleteDialogData,
} from './components/library-delete-dialog/library-delete-dialog';
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
import {
  LIBRARY_TAB,
  LIBRARY_TABS,
  SORT_FIELD,
  TYPE,
  tabToType,
} from './constants/library.constants';
import { DEFAULT_LIBRARY_FILTERS, LibraryFilters } from './models/library-filters.model';
import { fromBook, fromMangaVolume, LibraryItem } from './models/library-item.model';
import { READING_STATUS } from '@shared/constants';
import { AuthService } from '../../services/auth.service';
import { FanficSection } from './components/fanfic-section/fanfic-section';

/** Clave de `localStorage` donde se recuerda la última pestaña activa de Biblioteca. */
const ACTIVE_TAB_STORAGE_KEY = 'imladris:library-active-tab';

function loadStoredTab(): LIBRARY_TAB {
  try {
    const raw = localStorage.getItem(ACTIVE_TAB_STORAGE_KEY);
    const parsed = raw ? Number(raw) : null;
    return parsed === LIBRARY_TAB.MANGA || parsed === LIBRARY_TAB.FANFIC
      ? (parsed as LIBRARY_TAB)
      : LIBRARY_TAB.BOOK;
  } catch {
    return LIBRARY_TAB.BOOK;
  }
}

@Component({
  imports: [
    FanficSection,
    LibraryDataDisplay,
    LibrarySearch,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
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
  protected readonly authService = inject(AuthService);

  private readonly books = signal<LibraryItem[]>([]);
  private readonly mangaVolumes = signal<LibraryItem[]>([]);
  protected readonly authors = signal<Author[]>([]);
  protected readonly series = signal<BookSerie[]>([]);
  protected readonly editorials = signal<Editorial[]>([]);
  protected readonly mangas = signal<Manga[]>([]);

  protected readonly filters = signal<LibraryFilters>(DEFAULT_LIBRARY_FILTERS);

  protected readonly TYPE = TYPE;
  protected readonly LIBRARY_TAB = LIBRARY_TAB;
  protected readonly tabs = LIBRARY_TABS;
  protected readonly activeTab = signal<LIBRARY_TAB>(loadStoredTab());

  private readonly sourceItems = computed<LibraryItem[]>(() =>
    this.filters().type === TYPE.BOOK ? this.books() : this.mangaVolumes(),
  );

  protected readonly finishYears = computed(() =>
    extractYears(this.sourceItems(), (i) => i.finishDate),
  );
  protected readonly adquisitionYears = computed(() =>
    extractYears(this.sourceItems(), (i) => i.adquisitionDate),
  );
  protected readonly displayItems = computed(() =>
    applyFilters(this.sourceItems(), this.filters()),
  );

  ngOnInit(): void {
    this._loadReferenceData();
    this._loadItems();
    this._syncFiltersWithTab(this.activeTab());
  }

  // ---------- Pestañas ----------

  protected onTabChange(tab: LIBRARY_TAB): void {
    this.activeTab.set(tab);
    try {
      localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, String(tab));
    } catch (e) {
      console.warn('No se pudo guardar la pestaña activa de la biblioteca:', e);
    }
    this._syncFiltersWithTab(tab);
  }

  private _syncFiltersWithTab(tab: LIBRARY_TAB): void {
    if (tab === LIBRARY_TAB.FANFIC) return;
    const type = tabToType(tab);
    if (this.filters().type !== type) {
      this.filters.update((f) => ({ ...f, type }));
    }
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
      authorNames: item.authors.length
        ? item.authors.map((a) => a.name).join(', ')
        : 'Autor desconocido',
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
          finishDate: new Date(),
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
          volumeNumber: volume.volumeNumber ?? null,
          readingStatus: READING_STATUS.FINISHED,
          releaseDate: volume.releaseDate ? new Date(volume.releaseDate) : undefined,
          coverImageUrl: volume.coverImageUrl,
          adquisitionDate: volume.adquisitionDate ? new Date(volume.adquisitionDate) : undefined,
          startDate: volume.startDate ? new Date(volume.startDate) : undefined,
          finishDate: new Date(),
          notes: volume.notes,
          language: volume.language,
          editorialId: volume.editorial.id,
        });
      }
      await this._loadItems();
    } catch (err) {
      this.error.set('No se ha podido marcar como finalizado. Inténtalo de nuevo.');
      console.error(err);
    }
  }
}

function extractYears(
  items: LibraryItem[],
  pick: (item: LibraryItem) => string | undefined,
): number[] {
  const years = new Set<number>();
  for (const item of items) {
    const date = pick(item);
    if (date) years.add(Number(date.slice(0, 4)));
  }
  return [...years].sort((a, b) => b - a);
}

function applyFilters(items: LibraryItem[], filters: LibraryFilters): LibraryItem[] {
  let result = items;

  if (filters.title) {
    const q = filters.title.toLowerCase();
    result = result.filter((i) => i.title.toLowerCase().includes(q));
  }
  if (filters.authorId != null) {
    result = result.filter((i) => i.authors.some((a) => a.id === filters.authorId));
  }
  if (filters.serieId != null) {
    result = result.filter((i) => i.serieId === filters.serieId);
  }
  if (filters.editorialId != null) {
    result = result.filter((i) => i.editorial?.id === filters.editorialId);
  }
  if (filters.readingStatus != null) {
    result = result.filter((i) => i.readingStatus === filters.readingStatus);
  }
  if (filters.finishYear != null) {
    result = result.filter((i) => i.finishDate?.startsWith(String(filters.finishYear)));
  }
  if (filters.adquisitionYear != null) {
    result = result.filter((i) => i.adquisitionDate?.startsWith(String(filters.adquisitionYear)));
  }

  const dir = filters.sortDirection === 'desc' ? -1 : 1;
  const sortBy = filters.sortBy.length ? filters.sortBy : [SORT_FIELD.TITLE];
  result = [...result].sort((a, b) => {
    for (const field of sortBy) {
      const cmp = compareByField(a, b, field);
      if (cmp !== 0) return cmp * dir;
    }
    return 0;
  });

  return result;
}

function compareByField(a: LibraryItem, b: LibraryItem, field: SORT_FIELD): number {
  const va = fieldValue(a, field);
  const vb = fieldValue(b, field);
  if (va == null && vb == null) return 0;
  if (va == null) return 1;
  if (vb == null) return -1;
  if (typeof va === 'number' && typeof vb === 'number') return va - vb;
  return String(va).localeCompare(String(vb), 'es');
}

function fieldValue(item: LibraryItem, field: SORT_FIELD): string | number | undefined {
  switch (field) {
    case SORT_FIELD.TITLE:
      return item.title;
    case SORT_FIELD.AUTHOR:
      return item.authors[0]?.name;
    case SORT_FIELD.SERIE:
      return item.serieTitle;
    case SORT_FIELD.VOLUME_NUMBER:
      return item.serieVolume;
    case SORT_FIELD.FINISH_DATE:
      return item.finishDate;
    case SORT_FIELD.ADQUISITION_DATE:
      return item.adquisitionDate;
    case SORT_FIELD.RELEASE_DATE:
      return item.releaseDate;
    case SORT_FIELD.NOTES:
      return item.notes;
  }
}
