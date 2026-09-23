import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { YearlyReading } from '@shared/models';
import { BookService } from '../../../../services/book.service';
import { FanficService } from '../../../../services/fanfic.service';
import { MangaVolumeService } from '../../../../services/manga-volume.service';
import { YearlyReadingService } from '../../../../services/yearly-reading.service';
import { dateRangeValidator } from '../../../../shared/validators/date-range.validator';

export interface YearlyReadingsFormModalData {
  year: number;
  reading?: YearlyReading;
}

interface LibrarySuggestion {
  title: string;
  authors: string[];
  coverUrl?: string;
  /**
   * Solo disponible en sugerencias provenientes de fanfics: libros y tomos de manga no
   * llevan un número de páginas propio en su ficha, así que para ellos queda `undefined`.
   */
  pages?: number;
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
    MatDatepickerModule,
    MatProgressSpinnerModule,
  ],
  selector: 'app-yearly-readings-form-modal',
  styleUrl: './yearly-readings-form-modal.css',
  templateUrl: './yearly-readings-form-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearlyReadingsFormModal implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _dialogRef = inject(MatDialogRef<YearlyReadingsFormModal>);
  private readonly _service = inject(YearlyReadingService);
  private readonly _bookService = inject(BookService);
  private readonly _mangaVolumeService = inject(MangaVolumeService);
  private readonly _fanficService = inject(FanficService);
  protected readonly data = inject<YearlyReadingsFormModalData>(MAT_DIALOG_DATA);

  protected readonly isEdit = !!this.data.reading;
  protected readonly saving = signal(false);

  protected readonly librarySearchControl = new FormControl<string>('', { nonNullable: true });
  private readonly _librarySuggestions = signal<LibrarySuggestion[]>([]);
  protected readonly filteredLibrarySuggestions = signal<LibrarySuggestion[]>([]);

  protected readonly form = this._fb.nonNullable.group(
    {
      title: ['', Validators.required],
      authors: ['', Validators.required],
      pages: [0, [Validators.required, Validators.min(1)]],
      startDate: [null as Date | null, Validators.required],
      endDate: [null as Date | null],
      coverUrl: [''],
    },
    { validators: dateRangeValidator('startDate', 'endDate') },
  );

  constructor() {
    this.librarySearchControl.valueChanges.subscribe((term) => {
      this.filteredLibrarySuggestions.set(this._filterSuggestions(term));
    });
  }

  async ngOnInit(): Promise<void> {
    const reading = this.data.reading;
    if (reading) {
      this.form.patchValue({
        title: reading.title,
        authors: reading.authors.join(', '),
        pages: reading.pages,
        startDate: new Date(`${reading.startDate}T00:00:00`),
        endDate: reading.endDate ? new Date(`${reading.endDate}T00:00:00`) : null,
        coverUrl: reading.coverUrl,
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
      ...(suggestion.pages != null ? { pages: suggestion.pages } : {}),
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
      year: this.data.year,
      title: raw.title.trim(),
      authors: raw.authors
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      pages: raw.pages,
      startDate: this._toDateString(raw.startDate)!,
      endDate: this._toDateString(raw.endDate),
      coverUrl: raw.coverUrl?.trim() ?? '',
    };

    this.saving.set(true);
    try {
      if (this.data.reading) {
        await this._service.update(this.data.reading.id, input);
      } else {
        await this._service.create(input);
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
    const [books, volumes, fanfics] = await Promise.all([
      this._bookService.getAll(),
      this._mangaVolumeService.getAll(),
      this._fanficService.getAll(),
    ]);

    const fromBooks: LibrarySuggestion[] = books.map((b) => ({
      title: b.title,
      authors: b.authors.map((a) => a.name),
      coverUrl: b.coverImageUrl,
    }));

    const fromVolumes: LibrarySuggestion[] = volumes.map((v) => ({
      title: `${v.title} ${!!v.volumeNumber ? `Vol. ${v.volumeNumber}` : v.notes}`,
      authors: v.authors.map((a) => a.name),
      coverUrl: v.coverImageUrl,
    }));

    const fromFanfics: LibrarySuggestion[] = fanfics.map((f) => ({
      title: f.title,
      authors: f.authors.map((a) => a),
      coverUrl: f.coverUrl,
      pages: f.pages,
    }));

    const all = [...fromBooks, ...fromVolumes, ...fromFanfics];
    this._librarySuggestions.set(all);
    this.filteredLibrarySuggestions.set(all);
  }

  private _filterSuggestions(term: string): LibrarySuggestion[] {
    const q = (term ?? '').trim().toLowerCase();
    const all = this._librarySuggestions();
    if (!q) return all;
    return all.filter((s) => s.title.toLowerCase().includes(q));
  }

  private _toDateString(date: Date | null): string | null {
    if (!date) return null;
    const d = new Date(date);
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offset * 60_000);
    return local.toISOString().slice(0, 10);
  }
}
