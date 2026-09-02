import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal
} from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { READING_STATUS, READING_STATUS_LABELS } from '@shared/constants';
import { Author, BookSerie, Editorial, Manga } from '@shared/models';
import { debounceTime, map, startWith, tap } from 'rxjs';
import {
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIRECTION,
  MODE,
  MODE_LABELS,
  SORT_FIELD,
  SORT_FIELD_LABELS,
  TYPE,
  TYPE_LABELS,
} from '../../constants/library.consants';
import { DEFAULT_LIBRARY_FILTERS, LibraryFilters } from '../../models/library-filters.model';

type NameableRef<T> = T | string | null;

/** Clave de `localStorage` donde se guardan los filtros de la biblioteca entre sesiones. */
const STORAGE_KEY = 'imladris:library-filters';

interface StoredLibraryFilters {
  mode: MODE;
  type: TYPE;
  title: string;
  authorId: number | null;
  serieId: number | null;
  finishYear: number | null;
  adquisitionYear: number | null;
  editorialId: number | null;
  readingStatus: READING_STATUS | null;
  sortBy: SORT_FIELD[];
  sortDirection: 'asc' | 'desc';
}

/**
 * Lee los filtros guardados en `localStorage`. Se valida cada campo de forma defensiva
 * (por si el dato es antiguo o está corrupto); si algo no encaja, se usa el valor por defecto
 * de ese campo en lugar de descartar todo el objeto.
 */
function loadStoredFilters(): StoredLibraryFilters | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed: any = JSON.parse(raw);
    const type: TYPE = parsed?.type === TYPE.MANGA ? TYPE.MANGA : TYPE.BOOK;
    const sortByCandidate = parsed?.sortBy;
    const validSortBy =
      Array.isArray(sortByCandidate) &&
      sortByCandidate.length > 0 &&
      sortByCandidate.every((field: unknown) =>
        Object.values(SORT_FIELD).includes(field as SORT_FIELD),
      );

    return {
      mode: parsed?.mode === MODE.TABLE ? MODE.TABLE : MODE.GALLERY,
      type,
      title: typeof parsed?.title === 'string' ? parsed.title : '',
      authorId: typeof parsed?.authorId === 'number' ? parsed.authorId : null,
      serieId: typeof parsed?.serieId === 'number' ? parsed.serieId : null,
      finishYear: typeof parsed?.finishYear === 'number' ? parsed.finishYear : null,
      adquisitionYear: typeof parsed?.adquisitionYear === 'number' ? parsed.adquisitionYear : null,
      editorialId: typeof parsed?.editorialId === 'number' ? parsed.editorialId : null,
      readingStatus: Object.values(READING_STATUS).includes(parsed?.readingStatus)
        ? (parsed.readingStatus as READING_STATUS)
        : null,
      sortBy: validSortBy ? (sortByCandidate as SORT_FIELD[]) : DEFAULT_SORT_BY[type],
      sortDirection: parsed?.sortDirection === 'desc' ? 'desc' : 'asc',
    };
  } catch (e) {
    console.warn('No se pudieron leer los filtros guardados de la biblioteca:', e);
    return null;
  }
}

/** Guarda los filtros actuales para restaurarlos la próxima vez que se cargue la página. */
function saveStoredFilters(filters: LibraryFilters): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch (e) {
    console.error('No se han podido guardar los filtros de la biblioteca:', e);
  }
}

@Component({
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  selector: 'app-library-search',
  styleUrl: './library-search.css',
  templateUrl: './library-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibrarySearch {
  /** Filtros restaurados de `localStorage` al construir el componente (o `null` si no había nada). */
  private readonly _stored = loadStoredFilters();

  readonly authors = input<Author[]>([]);
  readonly series = input<BookSerie[]>([]);
  readonly editorials = input<Editorial[]>([]);
  readonly mangas = input<Manga[]>([]);
  readonly finishYears = input<number[]>([]);
  readonly adquisitionYears = input<number[]>([]);
  readonly resultCount = input<number>(0);

  protected readonly MODE = MODE;
  protected readonly TYPE = TYPE;
  protected readonly modeLabels = MODE_LABELS;
  protected readonly typeLabels = TYPE_LABELS;
  protected readonly readingStatuses = Object.values(READING_STATUS);
  protected readonly readingStatusLabels = READING_STATUS_LABELS;
  protected readonly sortFields = Object.values(SORT_FIELD);
  protected readonly sortFieldLabels = SORT_FIELD_LABELS;

  protected readonly form = new FormGroup({
    mode: new FormControl(this._stored?.mode ?? DEFAULT_LIBRARY_FILTERS.mode, {
      nonNullable: true,
    }),
    type: new FormControl(this._stored?.type ?? DEFAULT_LIBRARY_FILTERS.type, {
      nonNullable: true,
    }),
    title: new FormControl(this._stored?.title ?? '', { nonNullable: true }),
    author: new FormControl<NameableRef<Author>>(null),
    serie: new FormControl<NameableRef<BookSerie>>(null),
    manga: new FormControl<NameableRef<Manga>>(null),
    finishYear: new FormControl<number | null>(this._stored?.finishYear ?? null),
    adquisitionYear: new FormControl<number | null>(this._stored?.adquisitionYear ?? null),
    editorial: new FormControl<NameableRef<Editorial>>(null),
    readingStatus: new FormControl<READING_STATUS | null>(this._stored?.readingStatus ?? null),
    sortBy: new FormControl(this._stored?.sortBy ?? DEFAULT_LIBRARY_FILTERS.sortBy, {
      nonNullable: true,
    }),
    sortDirection: new FormControl(
      this._stored?.sortDirection ?? DEFAULT_LIBRARY_FILTERS.sortDirection,
      {
        nonNullable: true,
      },
    ),
  });

  /** Se usa en la plantilla para ocultar "Serie" (libros) / "Manga" y para calcular el orden por defecto. */
  protected readonly type = toSignal(this.form.controls.type.valueChanges, {
    initialValue: this._stored?.type ?? DEFAULT_LIBRARY_FILTERS.type,
  });

  /**
   * `mat-select[multiple]` reordena su `value` según la posición de las opciones en la lista,
   * no según el orden de clic del usuario. Este signal lleva la cuenta real del orden de selección
   * (se añade al hacer clic, se quita al deseleccionar) y es la fuente de verdad para `sortBy`.
   */
  protected readonly manualSortOrder = signal<SORT_FIELD[]>(
    this._stored?.sortBy ?? DEFAULT_LIBRARY_FILTERS.sortBy,
  );

  protected readonly sortByTriggerLabel = computed(() =>
    this.manualSortOrder()
      .map((field) => this.sortFieldLabels[field])
      .join(' → '),
  );

  private readonly authorQuery = toSignal(this.form.controls.author.valueChanges, {
    initialValue: null,
  });
  private readonly serieQuery = toSignal(this.form.controls.serie.valueChanges, {
    initialValue: null,
  });
  private readonly mangaQuery = toSignal(this.form.controls.manga.valueChanges, {
    initialValue: null,
  });
  private readonly editorialQuery = toSignal(this.form.controls.editorial.valueChanges, {
    initialValue: null,
  });

  protected readonly filteredAuthors = computed(() =>
    filterByName(this.authors(), this.authorQuery(), (a) => a.name),
  );
  protected readonly filteredSeries = computed(() =>
    filterByName(this.series(), this.serieQuery(), (s) => s.title),
  );
  protected readonly filteredMangas = computed(() =>
    filterByName(this.mangas(), this.mangaQuery(), (m) => m.title),
  );
  protected readonly filteredEditorials = computed(() =>
    filterByName(this.editorials(), this.editorialQuery(), (e) => e.name),
  );

  protected readonly activeFilterCount = toSignal(
    this.form.valueChanges.pipe(
      startWith(this.form.getRawValue()),
      map(
        (v) =>
          [
            v.title,
            v.author,
            v.serie,
            v.manga,
            v.finishYear,
            v.adquisitionYear,
            v.editorial,
            v.readingStatus,
          ].filter((value) => value !== null && value !== '').length,
      ),
    ),
    { initialValue: 0 },
  );

  /**
   * Ids de autor/serie/manga/editorial restaurados de `localStorage` pendientes de resolver a un
   * objeto real (los filtros guardados solo tienen el id; el objeto llega cuando `authors`/`series`/
   * `mangas`/`editorials` terminan de cargarse desde Supabase). Se pone a `null` en cuanto se resuelven.
   */
  private readonly _pendingSelectionIds = signal(
    this._stored
      ? {
          type: this._stored.type,
          authorId: this._stored.authorId,
          serieId: this._stored.serieId,
          editorialId: this._stored.editorialId,
        }
      : null,
  );

  readonly filtersChange = outputFromObservable(
    this.form.valueChanges.pipe(
      startWith(this.form.getRawValue()),
      debounceTime(200),
      map((value): LibraryFilters => ({
        mode: value.mode ?? DEFAULT_LIBRARY_FILTERS.mode,
        type: value.type ?? DEFAULT_LIBRARY_FILTERS.type,
        title: value.title ?? '',
        authorId: idOf(value.author),
        serieId: value.type === TYPE.MANGA ? idOf(value.manga) : idOf(value.serie),
        finishYear: value.finishYear ?? null,
        adquisitionYear: value.adquisitionYear ?? null,
        editorialId: idOf(value.editorial),
        readingStatus: value.readingStatus ?? null,
        sortBy: this.manualSortOrder(),
        sortDirection: value.sortDirection ?? 'asc',
      })),
      tap((filters) => {
        // Mientras haya una selección de autor/serie/manga/editorial pendiente de restaurar, no
        // persistimos todavía: ese primer valor aún no incluye el id guardado (el objeto no ha llegado).
        if (this._pendingSelectionIds()) return;
        saveStoredFilters(filters);
      }),
    ),
  );

  /** En cuanto llegan las listas de autores/series/mangas/editoriales, resuelve la selección guardada. */
  private readonly _restoreSavedSelections = effect(() => {
    const pending = this._pendingSelectionIds();
    if (!pending) return;

    const authors = this.authors();
    const series = this.series();
    const mangas = this.mangas();
    const editorials = this.editorials();
    if (
      authors.length === 0 &&
      series.length === 0 &&
      mangas.length === 0 &&
      editorials.length === 0
    )
      return;

    const patch: Partial<{
      author: NameableRef<Author>;
      serie: NameableRef<BookSerie>;
      manga: NameableRef<Manga>;
      editorial: NameableRef<Editorial>;
    }> = {};

    if (pending.authorId != null) {
      const found = authors.find((a) => a.id === pending.authorId);
      if (found) patch.author = found;
    }
    if (pending.serieId != null) {
      if (pending.type === TYPE.MANGA) {
        const found = mangas.find((m) => m.id === pending.serieId);
        if (found) patch.manga = found;
      } else {
        const found = series.find((s) => s.id === pending.serieId);
        if (found) patch.serie = found;
      }
    }
    if (pending.editorialId != null) {
      const found = editorials.find((e) => e.id === pending.editorialId);
      if (found) patch.editorial = found;
    }

    if (Object.keys(patch).length > 0) this.form.patchValue(patch);
    this._pendingSelectionIds.set(null);
  });

  /** Evita que el efecto de sincronización de orden se dispare en el arranque y pise lo restaurado. */
  private _typeSyncInitialized = false;

  /** Al cambiar de colección (novelas/manga) por acción del usuario, el orden vuelve al que corresponde por defecto. */
  private readonly _syncDefaultSortOnTypeChange = effect(() => {
    const type = this.type();
    if (!this._typeSyncInitialized) {
      this._typeSyncInitialized = true;
      return;
    }
    const defaultSort = DEFAULT_SORT_BY[type];
    this.form.patchValue({ sortBy: defaultSort, sortDirection: DEFAULT_SORT_DIRECTION });
    this.manualSortOrder.set(defaultSort);
  });

  protected displayAuthor = (v: NameableRef<Author>) =>
    typeof v === 'string' ? v : (v?.name ?? '');
  protected displaySerie = (v: NameableRef<BookSerie>) =>
    typeof v === 'string' ? v : (v?.title ?? '');
  protected displayManga = (v: NameableRef<Manga>) =>
    typeof v === 'string' ? v : (v?.title ?? '');
  protected displayEditorial = (v: NameableRef<Editorial>) =>
    typeof v === 'string' ? v : (v?.name ?? '');

  protected sortPosition(field: SORT_FIELD): number | null {
    const index = this.manualSortOrder().indexOf(field);
    return index === -1 ? null : index + 1;
  }

  protected onSortOptionToggle(field: SORT_FIELD, event: MatOptionSelectionChange): void {
    if (!event.isUserInput) return;
    const selected = event.source.selected;
    this.manualSortOrder.update((current) => {
      if (selected) {
        return current.includes(field) ? current : [...current, field];
      }
      return current.filter((f) => f !== field);
    });
  }

  protected reset(): void {
    const mode = this.form.controls.mode.value;
    const type = this.form.controls.type.value;
    const defaultSort = DEFAULT_SORT_BY[type];
    this.form.reset({
      ...DEFAULT_LIBRARY_FILTERS,
      mode,
      type,
      sortBy: defaultSort,
      sortDirection: DEFAULT_SORT_DIRECTION,
    });
    this.manualSortOrder.set(defaultSort);
  }

  protected resetSort(): void {
    const type = this.form.controls.type.value;
    const defaultSort = DEFAULT_SORT_BY[type];
    this.form.patchValue({ sortBy: defaultSort, sortDirection: DEFAULT_SORT_DIRECTION });
    this.manualSortOrder.set(defaultSort);
  }
}

function idOf<T extends { id: number }>(value: NameableRef<T> | undefined): number | null {
  return value && typeof value === 'object' ? value.id : null;
}

function filterByName<T>(items: T[], query: NameableRef<T>, nameFn: (item: T) => string): T[] {
  const search = (typeof query === 'string' ? query : query ? nameFn(query) : '').toLowerCase();
  if (!search) return items.slice(0, 30);
  return items.filter((item) => nameFn(item).toLowerCase().includes(search)).slice(0, 30);
}
