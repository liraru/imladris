import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthorService } from '../../../../services/author.service';
import { BookSerieService } from '../../../../services/book-serie.service';
import { BookService, BookInput } from '../../../../services/book.service';
import { EditorialService } from '../../../../services/editorial.service';
import { MangaService, MangaInput } from '../../../../services/manga.service';
import { MangaVolumeService, MangaVolumeInput } from '../../../../services/manga-volume.service';

import { Author, BookSerie, Editorial, Manga } from '@shared/models';
import { COUNTRY, COUNTRY_LABELS } from '../../../../shared/constants/countries.constant';
import { DEMOGRAPHIC, DEMOGRAPHIC_LABELS, GENRE, GENRE_LABELS } from '../../../../shared/constants/categories.constant';
import { LANGUAGE, LANGUAGE_LABELS, READING_STATUS, READING_STATUS_LABELS } from '@shared/constants';
import { TYPE, TYPE_LABELS } from '../../constants/library.consants';
import { FORM_MODE, FORM_MODE_LABELS } from '../../constants/library-form.constants';

export interface LibraryFormModalData {
  mode: FORM_MODE;
  type: TYPE;
  /** Id del libro o tomo de manga. Requerido en modo DETALLE y EDICION. */
  itemId?: number;
}

export interface LibraryFormModalResult {
  saved: boolean;
}

function toDate(value?: string): Date | null {
  return value ? new Date(value) : null;
}

@Component({
  selector: 'app-library-form-modal',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  templateUrl: './library-form-modal.html',
  styleUrl: './library-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryFormModal implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<LibraryFormModal, LibraryFormModalResult>);
  protected readonly data = inject<LibraryFormModalData>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  private readonly authorSrv = inject(AuthorService);
  private readonly editorialSrv = inject(EditorialService);
  private readonly bookSrv = inject(BookService);
  private readonly bookSerieSrv = inject(BookSerieService);
  private readonly mangaSrv = inject(MangaService);
  private readonly mangaVolumeSrv = inject(MangaVolumeService);

  protected readonly FORM_MODE = FORM_MODE;
  protected readonly TYPE = TYPE;
  protected readonly typeLabels = TYPE_LABELS;
  protected readonly formModeLabels = FORM_MODE_LABELS;
  protected readonly languageLabels = LANGUAGE_LABELS;
  protected readonly readingStatusLabels = READING_STATUS_LABELS;
  protected readonly countryLabels = COUNTRY_LABELS;
  protected readonly genreLabels = GENRE_LABELS;
  protected readonly demographicLabels = DEMOGRAPHIC_LABELS;

  protected readonly languages = Object.values(LANGUAGE);
  protected readonly readingStatuses = Object.values(READING_STATUS);
  protected readonly countries = Object.values(COUNTRY);
  protected readonly genres = Object.values(GENRE);
  protected readonly demographics = Object.values(DEMOGRAPHIC);

  protected readonly type = this.data.type;
  protected readonly isBook = this.type === TYPE.BOOK;

  protected readonly mode = signal<FORM_MODE>(this.data.mode);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly isReadOnly = computed(() => this.mode() === FORM_MODE.DETALLE);

  protected readonly authors = signal<Author[]>([]);
  protected readonly editorials = signal<Editorial[]>([]);
  protected readonly series = signal<BookSerie[]>([]);
  protected readonly mangas = signal<Manga[]>([]);

  protected readonly showQuickAuthor = signal(false);
  protected readonly showQuickEditorial = signal(false);
  protected readonly showQuickManga = signal(false);

  protected readonly quickAuthorForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    country: [COUNTRY.SPAIN, Validators.required],
    notes: [''],
  });

  protected readonly quickEditorialForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    country: [COUNTRY.SPAIN, Validators.required],
    website: [''],
  });

  protected readonly quickMangaForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    demographic: [DEMOGRAPHIC.SHONEN, Validators.required],
  });

  protected readonly form = this.fb.group({
    title: ['', Validators.required],
    authorIds: [[] as number[], Validators.required],
    editorialId: [null as number | null, Validators.required],
    readingStatus: [READING_STATUS.NOT_STARTED, Validators.required],
    language: [LANGUAGE.ES, Validators.required],
    releaseDate: [null as Date | null],
    adquisitionDate: [null as Date | null],
    startDate: [null as Date | null],
    finishDate: [null as Date | null],
    coverImageUrl: [''],
    notes: [''],
    // Solo libros
    serieId: [null as number | null],
    serieVolume: [null as number | null],
    genres: [[] as GENRE[]],
    // Solo manga
    mangaId: [null as number | null],
    volumeNumber: [null as number | null],
  });

  async ngOnInit(): Promise<void> {
    if (!this.isBook) {
      this.form.get('mangaId')!.addValidators(Validators.required);
      this.form.get('volumeNumber')!.addValidators(Validators.required);
    }

    try {
      const [authors, editorials] = await Promise.all([
        this.authorSrv.getAll(),
        this.editorialSrv.getAll(),
      ]);
      this.authors.set(authors);
      this.editorials.set(editorials);

      if (this.isBook) {
        this.series.set(await this.bookSerieSrv.getAll());
      } else {
        this.mangas.set(await this.mangaSrv.getAll());
      }

      if (this.data.itemId != null) {
        await this.loadItem(this.data.itemId);
      }

      if (this.mode() === FORM_MODE.DETALLE) {
        this.form.disable();
      }
    } catch {
      this.error.set('No se ha podido cargar la información necesaria para el formulario.');
    } finally {
      this.loading.set(false);
    }
  }

  private async loadItem(id: number): Promise<void> {
    if (this.isBook) {
      const book = await this.bookSrv.getById(id);
      if (!book) throw new Error('Libro no encontrado');
      this.form.patchValue({
        title: book.title,
        authorIds: book.authors.map((a) => a.id),
        editorialId: book.editorial.id,
        readingStatus: book.readingStatus,
        language: book.language,
        releaseDate: toDate(book.releaseDate),
        adquisitionDate: toDate(book.adquisitionDate),
        startDate: toDate(book.startDate),
        finishDate: toDate(book.finishDate),
        coverImageUrl: book.coverImageUrl ?? '',
        notes: book.notes ?? '',
        serieId: book.serie?.id ?? null,
        serieVolume: book.serieVolume ?? null,
        genres: book.genres,
      });
    } else {
      const volume = await this.mangaVolumeSrv.getById(id);
      if (!volume) throw new Error('Tomo no encontrado');
      this.form.patchValue({
        title: volume.title,
        authorIds: volume.authors.map((a) => a.id),
        editorialId: volume.editorial.id,
        readingStatus: volume.readingStatus,
        language: volume.language,
        releaseDate: toDate(volume.releaseDate),
        adquisitionDate: toDate(volume.adquisitionDate),
        startDate: toDate(volume.startDate),
        finishDate: toDate(volume.finishDate),
        coverImageUrl: volume.coverImageUrl ?? '',
        notes: volume.notes ?? '',
        mangaId: volume.mangaId,
        volumeNumber: volume.volumeNumber,
      });
    }
  }

  // ---------- Cambio de modo ----------

  protected enableEdit(): void {
    this.mode.set(FORM_MODE.EDICION);
    this.form.enable();
  }

  // ---------- Alta rápida: autor ----------

  protected toggleQuickAuthor(): void {
    this.showQuickAuthor.update((v) => !v);
  }

  protected async createQuickAuthor(): Promise<void> {
    if (this.quickAuthorForm.invalid) {
      this.quickAuthorForm.markAllAsTouched();
      return;
    }
    const value = this.quickAuthorForm.getRawValue();
    const created = await this.authorSrv.create({
      name: value.name,
      country: value.country,
      notes: value.notes || undefined,
    });
    this.authors.update((list) => [...list, created].sort((a, b) => a.name.localeCompare(b.name)));
    const current = this.form.get('authorIds')!.value as number[];
    this.form.get('authorIds')!.setValue([...current, created.id]);
    this.quickAuthorForm.reset({ name: '', country: COUNTRY.SPAIN, notes: '' });
    this.showQuickAuthor.set(false);
  }

  // ---------- Alta rápida: editorial ----------

  protected toggleQuickEditorial(): void {
    this.showQuickEditorial.update((v) => !v);
  }

  protected async createQuickEditorial(): Promise<void> {
    if (this.quickEditorialForm.invalid) {
      this.quickEditorialForm.markAllAsTouched();
      return;
    }
    const value = this.quickEditorialForm.getRawValue();
    const created = await this.editorialSrv.create({
      name: value.name,
      country: value.country,
      website: value.website || undefined,
    });
    this.editorials.update((list) => [...list, created].sort((a, b) => a.name.localeCompare(b.name)));
    this.form.get('editorialId')!.setValue(created.id);
    this.quickEditorialForm.reset({ name: '', country: COUNTRY.SPAIN, website: '' });
    this.showQuickEditorial.set(false);
  }

  // ---------- Alta rápida: manga ----------

  protected toggleQuickManga(): void {
    this.showQuickManga.update((v) => !v);
  }

  protected async createQuickManga(): Promise<void> {
    if (this.quickMangaForm.invalid) {
      this.quickMangaForm.markAllAsTouched();
      return;
    }
    const value = this.quickMangaForm.getRawValue();
    const input: MangaInput = { title: value.title, demographic: value.demographic, authorIds: [], genres: [] };
    const created = await this.mangaSrv.create(input);
    this.mangas.update((list) => [...list, created].sort((a, b) => a.title.localeCompare(b.title)));
    this.form.get('mangaId')!.setValue(created.id);
    this.quickMangaForm.reset({ title: '', demographic: DEMOGRAPHIC.SHONEN });
    this.showQuickManga.set(false);
  }

  // ---------- Guardado ----------

  protected async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    const value = this.form.getRawValue();

    try {
      if (this.isBook) {
        const input: BookInput = {
          title: value.title!,
          authorIds: value.authorIds!,
          readingStatus: value.readingStatus!,
          releaseDate: value.releaseDate ?? undefined,
          coverImageUrl: value.coverImageUrl || undefined,
          adquisitionDate: value.adquisitionDate ?? undefined,
          startDate: value.startDate ?? undefined,
          finishDate: value.finishDate ?? undefined,
          notes: value.notes || undefined,
          language: value.language!,
          editorialId: value.editorialId!,
          serieId: value.serieId ?? undefined,
          serieVolume: value.serieVolume ?? undefined,
          genres: value.genres!,
        };
        if (this.mode() === FORM_MODE.ALTA) {
          await this.bookSrv.create(input);
        } else {
          await this.bookSrv.update(this.data.itemId!, input);
        }
      } else {
        const input: MangaVolumeInput = {
          title: value.title!,
          authorIds: value.authorIds!,
          mangaId: value.mangaId!,
          volumeNumber: value.volumeNumber!,
          readingStatus: value.readingStatus!,
          releaseDate: value.releaseDate ?? undefined,
          coverImageUrl: value.coverImageUrl || undefined,
          adquisitionDate: value.adquisitionDate ?? undefined,
          startDate: value.startDate ?? undefined,
          finishDate: value.finishDate ?? undefined,
          notes: value.notes || undefined,
          language: value.language!,
          editorialId: value.editorialId!,
        };
        if (this.mode() === FORM_MODE.ALTA) {
          await this.mangaVolumeSrv.create(input);
        } else {
          await this.mangaVolumeSrv.update(this.data.itemId!, input);
        }
      }
      this.dialogRef.close({ saved: true });
    } catch {
      this.error.set('No se ha podido guardar. Inténtalo de nuevo.');
    } finally {
      this.saving.set(false);
    }
  }

  protected cancel(): void {
    this.dialogRef.close({ saved: false });
  }
}
