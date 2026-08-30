import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Author, BookSerie, Editorial } from '@shared/models';
import { debounceTime, map, startWith } from 'rxjs';
import { READING_STATUS, READING_STATUS_LABELS } from '../../../../shared/constants/reading-status.constant';
import {
  MODE,
  MODE_LABELS,
  SORT_FIELD,
  SORT_FIELD_LABELS,
  TYPE,
  TYPE_LABELS,
} from '../../constants/library.consants';
import { DEFAULT_LIBRARY_FILTERS, LibraryFilters } from '../../models/library-filters.model';

type NameableRef<T> = T | string | null;

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
  readonly authors = input<Author[]>([]);
  readonly series = input<BookSerie[]>([]);
  readonly editorials = input<Editorial[]>([]);
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
    mode: new FormControl(DEFAULT_LIBRARY_FILTERS.mode, { nonNullable: true }),
    type: new FormControl(DEFAULT_LIBRARY_FILTERS.type, { nonNullable: true }),
    title: new FormControl('', { nonNullable: true }),
    author: new FormControl<NameableRef<Author>>(null),
    serie: new FormControl<NameableRef<BookSerie>>(null),
    finishYear: new FormControl<number | null>(null),
    adquisitionYear: new FormControl<number | null>(null),
    editorial: new FormControl<NameableRef<Editorial>>(null),
    readingStatus: new FormControl<READING_STATUS | null>(null),
    sortBy: new FormControl(DEFAULT_LIBRARY_FILTERS.sortBy, { nonNullable: true }),
    sortDirection: new FormControl(DEFAULT_LIBRARY_FILTERS.sortDirection, { nonNullable: true }),
  });

  /** Se usa en la plantilla para ocultar "Serie" cuando el tipo activo es manga. */
  protected readonly type = toSignal(this.form.controls.type.valueChanges, {
    initialValue: DEFAULT_LIBRARY_FILTERS.type,
  });

  private readonly authorQuery = toSignal(this.form.controls.author.valueChanges, { initialValue: null });
  private readonly serieQuery = toSignal(this.form.controls.serie.valueChanges, { initialValue: null });
  private readonly editorialQuery = toSignal(this.form.controls.editorial.valueChanges, {
    initialValue: null,
  });

  protected readonly filteredAuthors = computed(() =>
    filterByName(this.authors(), this.authorQuery(), (a) => a.name),
  );
  protected readonly filteredSeries = computed(() =>
    filterByName(this.series(), this.serieQuery(), (s) => s.title),
  );
  protected readonly filteredEditorials = computed(() =>
    filterByName(this.editorials(), this.editorialQuery(), (e) => e.name),
  );

  protected readonly activeFilterCount = toSignal(
    this.form.valueChanges.pipe(
      startWith(this.form.getRawValue()),
      map(
        (v) =>
          [v.title, v.author, v.serie, v.finishYear, v.adquisitionYear, v.editorial, v.readingStatus]
            .filter((value) => value !== null && value !== '').length,
      ),
    ),
    { initialValue: 0 },
  );

  readonly filtersChange = outputFromObservable(
    this.form.valueChanges.pipe(
      startWith(this.form.getRawValue()),
      debounceTime(200),
      map(
        (value): LibraryFilters => ({
          mode: value.mode ?? DEFAULT_LIBRARY_FILTERS.mode,
          type: value.type ?? DEFAULT_LIBRARY_FILTERS.type,
          title: value.title ?? '',
          authorId: idOf(value.author),
          serieId: idOf(value.serie),
          finishYear: value.finishYear ?? null,
          adquisitionYear: value.adquisitionYear ?? null,
          editorialId: idOf(value.editorial),
          readingStatus: value.readingStatus ?? null,
          sortBy: value.sortBy ?? [],
          sortDirection: value.sortDirection ?? 'asc',
        }),
      ),
    ),
  );

  protected displayAuthor = (v: NameableRef<Author>) => (typeof v === 'string' ? v : v?.name ?? '');
  protected displaySerie = (v: NameableRef<BookSerie>) => (typeof v === 'string' ? v : v?.title ?? '');
  protected displayEditorial = (v: NameableRef<Editorial>) => (typeof v === 'string' ? v : v?.name ?? '');

  protected reset(): void {
    this.form.reset({
      ...DEFAULT_LIBRARY_FILTERS,
      mode: this.form.controls.mode.value,
      type: this.form.controls.type.value,
    });
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