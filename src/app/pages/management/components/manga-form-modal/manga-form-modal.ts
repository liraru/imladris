import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map, startWith } from 'rxjs';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { MangaService } from '../../../../services/manga.service';
import { AuthorService } from '../../../../services/author.service';
import { Author, Manga } from '@shared/models';
import {
  DEMOGRAPHIC,
  DEMOGRAPHIC_LABELS,
  GENRE,
  GENRE_LABELS,
} from '../../../../shared/constants/categories.constant';
import { FORM_MODE, FORM_MODE_LABELS } from '../../constants/management-form.constants';

export interface MangaFormModalData {
  mode: FORM_MODE;
  manga?: Manga;
}

export type MangaFormModalResult = boolean;

function normalize(value: string | null | undefined): string {
  return (value ?? '').toLowerCase().trim();
}

@Component({
  selector: 'app-manga-form-modal',
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './manga-form-modal.html',
  styleUrl: './manga-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaFormModal implements OnInit {
  private readonly _dialogRef = inject(MatDialogRef<MangaFormModal, MangaFormModalResult>);
  protected readonly data = inject<MangaFormModalData>(MAT_DIALOG_DATA);
  private readonly _fb = inject(FormBuilder);
  private readonly _service = inject(MangaService);
  private readonly _authorSrv = inject(AuthorService);

  protected readonly FORM_MODE = FORM_MODE;
  protected readonly formModeLabels = FORM_MODE_LABELS;
  protected readonly demographics = Object.values(DEMOGRAPHIC);
  protected readonly demographicLabels = DEMOGRAPHIC_LABELS;
  protected readonly genres = Object.values(GENRE);
  protected readonly genreLabels = GENRE_LABELS;

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly authors = signal<Author[]>([]);
  protected readonly selectedAuthors = signal<Author[]>([]);

  protected readonly authorSearchCtrl = new FormControl('', { nonNullable: true });
  private readonly _authorSearch = toSignal(
    this.authorSearchCtrl.valueChanges.pipe(startWith(''), debounceTime(150), map(normalize)),
    { initialValue: '' },
  );

  protected readonly filteredAuthors = computed(() => {
    const query = this._authorSearch();
    const selectedIds = new Set(this.selectedAuthors().map((a) => a.id));
    const candidates = this.authors().filter((a) => !selectedIds.has(a.id));
    if (!query) return candidates.slice(0, 20);
    return candidates.filter((a) => normalize(a.name).includes(query)).slice(0, 20);
  });

  protected readonly form = this._fb.nonNullable.group({
    title: ['', Validators.required],
    demographic: [DEMOGRAPHIC.SHONEN, Validators.required],
    genres: [[] as GENRE[]],
  });

  async ngOnInit(): Promise<void> {
    try {
      const authors = await this._authorSrv.getAll();
      this.authors.set(authors);

      if (this.data.mode === FORM_MODE.EDICION && this.data.manga) {
        this.form.patchValue({
          title: this.data.manga.title,
          demographic: this.data.manga.demographic,
          genres: this.data.manga.genres,
        });
        this.selectedAuthors.set(this.data.manga.authors);
      }
    } catch (err) {
      this.error.set('No se pudieron cargar los autores.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  protected onAuthorSelected(event: MatAutocompleteSelectedEvent): void {
    const author = event.option.value as Author;
    if (!this.selectedAuthors().some((a) => a.id === author.id)) {
      this.selectedAuthors.update((list) => [...list, author]);
    }
    this.authorSearchCtrl.setValue('');
  }

  protected removeAuthor(authorId: number): void {
    this.selectedAuthors.update((list) => list.filter((a) => a.id !== authorId));
  }

  protected async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    const value = this.form.getRawValue();
    const authorIds = this.selectedAuthors().map((a) => a.id);

    try {
      if (this.data.mode === FORM_MODE.EDICION && this.data.manga) {
        await this._service.update(this.data.manga.id, {
          title: value.title,
          demographic: value.demographic,
          genres: value.genres,
          authorIds,
        });
      } else {
        await this._service.create({
          title: value.title,
          demographic: value.demographic,
          genres: value.genres,
          authorIds,
        });
      }
      this._dialogRef.close(true);
    } catch (err) {
      this.error.set('No se ha podido guardar el manga. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.saving.set(false);
    }
  }

  protected cancel(): void {
    this._dialogRef.close(false);
  }
}
