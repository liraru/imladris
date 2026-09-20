import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RATING, RATING_LABELS, READING_STATUS, READING_STATUS_LABELS } from '@shared/constants';
import { Fandom } from '@shared/models';
import {
  FANFIC_SORT_FIELD,
  FANFIC_SORT_FIELD_LABELS,
  DEFAULT_FANFIC_SORT,
  DEFAULT_FANFIC_SORT_DIRECTION,
} from '../../constants/fanfic.constants';
import { MODE, MODE_LABELS } from '../../constants/library.constants';
import { DEFAULT_FANFIC_FILTERS, FanficFilters } from '../../models/fanfic-filters.model';

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
  selector: 'app-fanfic-search',
  styleUrl: './fanfic-search.css',
  templateUrl: './fanfic-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FanficSearch {
  readonly fandoms = input<Fandom[]>([]);
  readonly resultCount = input<number>(0);

  protected readonly MODE = MODE;
  protected readonly modeLabels = MODE_LABELS;
  protected readonly ratings = Object.values(RATING);
  protected readonly ratingLabels = RATING_LABELS;
  protected readonly readingStatuses = Object.values(READING_STATUS);
  protected readonly readingStatusLabels = READING_STATUS_LABELS;
  protected readonly sortFields = Object.values(FANFIC_SORT_FIELD);
  protected readonly sortFieldLabels = FANFIC_SORT_FIELD_LABELS;

  protected readonly form = new FormGroup({
    mode: new FormControl(DEFAULT_FANFIC_FILTERS.mode, { nonNullable: true }),
    title: new FormControl('', { nonNullable: true }),
    fandom: new FormControl<NameableRef<Fandom>>(null),
    rating: new FormControl<RATING | null>(null),
    readingStatus: new FormControl<READING_STATUS | null>(null),
    sortBy: new FormControl(DEFAULT_FANFIC_SORT, { nonNullable: true }),
    sortDirection: new FormControl(DEFAULT_FANFIC_SORT_DIRECTION, { nonNullable: true }),
  });

  private readonly fandomQuery = toSignal(this.form.controls.fandom.valueChanges, {
    initialValue: null,
  });

  protected readonly filteredFandoms = computed(() => {
    const query = this.fandomQuery();
    const search = (typeof query === 'string' ? query : query ? query.name : '').toLowerCase();
    const all = this.fandoms();
    if (!search) return all.slice(0, 30);
    return all.filter((f) => f.name.toLowerCase().includes(search)).slice(0, 30);
  });

  protected readonly activeFilterCount = toSignal(
    this.form.valueChanges.pipe(
      startWith(this.form.getRawValue()),
      map(
        (v) =>
          [v.title, v.fandom, v.rating, v.readingStatus].filter(
            (value) => value !== null && value !== '',
          ).length,
      ),
    ),
    { initialValue: 0 },
  );

  protected displayFandom = (v: NameableRef<Fandom>) =>
    typeof v === 'string' ? v : (v?.name ?? '');

  readonly filtersChange = outputFromObservable(
    this.form.valueChanges.pipe(
      startWith(this.form.getRawValue()),
      debounceTime(200),
      map((value): FanficFilters => ({
        mode: value.mode ?? DEFAULT_FANFIC_FILTERS.mode,
        title: value.title ?? '',
        fandomId: idOf(value.fandom),
        rating: value.rating ?? null,
        readingStatus: value.readingStatus ?? null,
        sortBy: value.sortBy ?? DEFAULT_FANFIC_SORT,
        sortDirection: value.sortDirection === 'desc' ? 'desc' : 'asc',
      })),
    ),
  );

  protected reset(): void {
    const mode = this.form.controls.mode.value;
    this.form.reset({ ...DEFAULT_FANFIC_FILTERS, mode });
  }
}

function idOf<T extends { id: number }>(value: NameableRef<T> | undefined): number | null {
  return value && typeof value === 'object' ? value.id : null;
}
