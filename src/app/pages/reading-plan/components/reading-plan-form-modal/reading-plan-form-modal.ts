import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReadingPlanItem } from '@shared/models';
import { ReadingPlanService } from '../../../../services/reading-plan.service';
import { BookService } from '../../../../services/book.service';
import { MangaVolumeService } from '../../../../services/manga-volume.service';

export interface ReadingPlanFormModalData {
  /** Posición que ocupará el nuevo elemento (último de la cola). Ignorado en edición. */
  nextOrder: number;
  item?: ReadingPlanItem;
}

interface LibrarySuggestion {
  title: string;
  authors: string[];
  coverUrl?: string;
}

@Component({
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  selector: 'app-reading-plan-form-modal',
  styleUrl: './reading-plan-form-modal.css',
  templateUrl: './reading-plan-form-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingPlanFormModal implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _dialogRef = inject(MatDialogRef<ReadingPlanFormModal>);
  private readonly _service = inject(ReadingPlanService);
  private readonly _bookService = inject(BookService);
  private readonly _mangaVolumeService = inject(MangaVolumeService);
  protected readonly data = inject<ReadingPlanFormModalData>(MAT_DIALOG_DATA);

  protected readonly isEdit = !!this.data.item;
  protected readonly saving = signal(false);

  protected readonly librarySearchControl = new FormControl<string>('', { nonNullable: true });
  private readonly _librarySuggestions = signal<LibrarySuggestion[]>([]);
  protected readonly filteredLibrarySuggestions = signal<LibrarySuggestion[]>([]);

  protected readonly form = this._fb.nonNullable.group({
    title: ['', Validators.required],
    authors: ['', Validators.required],
    pages: [0, [Validators.required, Validators.min(1)]],
    coverUrl: [''],
  });

  constructor() {
    this.librarySearchControl.valueChanges.subscribe((term) => {
      this.filteredLibrarySuggestions.set(this._filterSuggestions(term));
    });
  }

  async ngOnInit(): Promise<void> {
    const item = this.data.item;
    if (item) {
      this.form.patchValue({
        title: item.title,
        authors: item.authors.join(', '),
        pages: item.pages,
        coverUrl: item.coverUrl,
      });
    }
    await this.loadLibrarySuggestions();
  }

  protected onLibraryOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const suggestion = event.option.value as LibrarySuggestion;
    this.form.patchValue({
      title: suggestion.title,
      authors: suggestion.authors.join(', '),
      coverUrl: suggestion.coverUrl ?? '',
    });
    this.librarySearchControl.setValue('', { emitEvent: false });
    this.filteredLibrarySuggestions.set(this._librarySuggestions());
  }

  protected async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const input = {
      title: raw.title.trim(),
      authors: raw.authors
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      pages: raw.pages,
      coverUrl: raw.coverUrl?.trim() ?? '',
    };

    this.saving.set(true);
    try {
      if (this.data.item) {
        await this._service.update(this.data.item.id, input);
      } else {
        await this._service.create({ ...input, order: this.data.nextOrder });
      }
      this._dialogRef.close(true);
    } finally {
      this.saving.set(false);
    }
  }

  protected cancel(): void {
    this._dialogRef.close(false);
  }

  private async loadLibrarySuggestions(): Promise<void> {
    const [books, volumes] = await Promise.all([
      this._bookService.getAll(),
      this._mangaVolumeService.getAll(),
    ]);

    const fromBooks: LibrarySuggestion[] = books.map((b) => ({
      title: b.title,
      authors: b.authors.map((a) => a.name),
      coverUrl: b.coverImageUrl,
    }));

    const fromVolumes: LibrarySuggestion[] = volumes.map((v) => ({
      title: v.title,
      authors: v.authors.map((a) => a.name),
      coverUrl: v.coverImageUrl,
    }));

    const all = [...fromBooks, ...fromVolumes];
    this._librarySuggestions.set(all);
    this.filteredLibrarySuggestions.set(all);
  }

  private _filterSuggestions(term: string): LibrarySuggestion[] {
    const q = (term ?? '').trim().toLowerCase();
    const all = this._librarySuggestions();
    if (!q) return all;
    return all.filter((s) => s.title.toLowerCase().includes(q));
  }
}
