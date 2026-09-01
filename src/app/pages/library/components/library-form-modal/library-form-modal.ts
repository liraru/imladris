import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map, startWith } from 'rxjs';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
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

/** Valor de un control de autocompletado: el objeto seleccionado, texto libre en curso, o vacío. */
type NameableRef<T> = T | string | null;

function toDate(value?: string): Date | null {
  return value ? new Date(value) : null;
}

function normalize(value: string | null | undefined): string {
  return (value ?? '').toLowerCase().trim();
}

@Component({
  selector: 'app-library-form-modal',
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
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

  /** Autores ya añadidos al libro/tomo (se muestran como chips). */
  protected readonly selectedAuthors = signal<Author[]>([]);

  protected readonly showQuickAuthor = signal(false);
  protected readonly showQuickEditorial = signal(false);
  protected readonly showQuickSerie = signal(false);
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

  protected readonly quickSerieForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    editorialId: [null as number | null, Validators.required],
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

  // ---------- Controles de búsqueda para los autocompletados ----------

  protected readonly authorSearchCtrl = new FormControl('', { nonNullable: true });
  protected readonly editorialSearchCtrl = new FormControl<NameableRef<Editorial>>('');
  protected readonly serieSearchCtrl = new FormControl<NameableRef<BookSerie>>('');
  protected readonly mangaSearchCtrl = new FormControl<NameableRef<Manga>>('');

  private readonly authorSearchValue = toSignal(
    this.authorSearchCtrl.valueChanges.pipe(startWith(''), debounceTime(150)),
    { initialValue: '' },
  );
  private readonly editorialSearchValue = toSignal(
    this.editorialSearchCtrl.valueChanges.pipe(
      startWith(this.editorialSearchCtrl.value),
      debounceTime(150),
      map((v) => (typeof v === 'string' ? v : (v?.name ?? ''))),
    ),
    { initialValue: '' },
  );
  private readonly serieSearchValue = toSignal(
    this.serieSearchCtrl.valueChanges.pipe(
      startWith(this.serieSearchCtrl.value),
      debounceTime(150),
      map((v) => (typeof v === 'string' ? v : (v?.title ?? ''))),
    ),
    { initialValue: '' },
  );
  private readonly mangaSearchValue = toSignal(
    this.mangaSearchCtrl.valueChanges.pipe(
      startWith(this.mangaSearchCtrl.value),
      debounceTime(150),
      map((v) => (typeof v === 'string' ? v : (v?.title ?? ''))),
    ),
    { initialValue: '' },
  );

  protected readonly filteredAuthors = computed(() => {
    const term = normalize(this.authorSearchValue());
    const selectedIds = new Set(this.selectedAuthors().map((a) => a.id));
    return this.authors()
      .filter((a) => !selectedIds.has(a.id))
      .filter((a) => !term || a.name.toLowerCase().includes(term));
  });

  protected readonly filteredEditorials = computed(() => {
    const term = normalize(this.editorialSearchValue());
    return this.editorials().filter((e) => !term || e.name.toLowerCase().includes(term));
  });

  protected readonly filteredSeries = computed(() => {
    const term = normalize(this.serieSearchValue());
    return this.series().filter((s) => !term || s.title.toLowerCase().includes(term));
  });

  protected readonly filteredMangas = computed(() => {
    const term = normalize(this.mangaSearchValue());
    return this.mangas().filter((m) => !term || m.title.toLowerCase().includes(term));
  });

  protected readonly displayEditorial = (value: NameableRef<Editorial>): string =>
    typeof value === 'string' ? value : (value?.name ?? '');
  protected readonly displaySerie = (value: NameableRef<BookSerie>): string =>
    typeof value === 'string' ? value : (value?.title ?? '');
  protected readonly displayManga = (value: NameableRef<Manga>): string =>
    typeof value === 'string' ? value : (value?.title ?? '');

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
        this.authorSearchCtrl.disable();
        this.editorialSearchCtrl.disable();
        this.serieSearchCtrl.disable();
        this.mangaSearchCtrl.disable();
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

      this.selectedAuthors.set(book.authors);
      this.editorialSearchCtrl.setValue(book.editorial);
      this.serieSearchCtrl.setValue(book.serie ?? null);

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

      this.selectedAuthors.set(volume.authors);
      this.editorialSearchCtrl.setValue(volume.editorial);
      this.mangaSearchCtrl.setValue(this.mangas().find((m) => m.id === volume.mangaId) ?? null);

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
    this.authorSearchCtrl.enable();
    this.editorialSearchCtrl.enable();
    this.serieSearchCtrl.enable();
    this.mangaSearchCtrl.enable();
  }

  // ---------- Autores (autocompletado + chips) ----------

  protected onAuthorSelected(event: MatAutocompleteSelectedEvent): void {
    this.addAuthor(event.option.value as Author);
  }

  private addAuthor(author: Author): void {
    if (this.selectedAuthors().some((a) => a.id === author.id)) {
      this.authorSearchCtrl.setValue('');
      return;
    }
    this.selectedAuthors.update((list) => [...list, author]);
    this.form.get('authorIds')!.setValue(this.selectedAuthors().map((a) => a.id));
    this.authorSearchCtrl.setValue('');
  }

  protected removeAuthor(authorId: number): void {
    this.selectedAuthors.update((list) => list.filter((a) => a.id !== authorId));
    this.form.get('authorIds')!.setValue(this.selectedAuthors().map((a) => a.id));
  }

  // ---------- Editorial (autocompletado) ----------

  protected onEditorialSelected(event: MatAutocompleteSelectedEvent): void {
    const editorial = event.option.value as Editorial;
    this.form.get('editorialId')!.setValue(editorial.id);
  }

  protected clearEditorial(): void {
    this.editorialSearchCtrl.setValue('');
    this.form.get('editorialId')!.setValue(null);
  }

  // ---------- Serie (autocompletado, solo libros) ----------

  protected onSerieSelected(event: MatAutocompleteSelectedEvent): void {
    const serie = event.option.value as BookSerie;
    this.form.get('serieId')!.setValue(serie.id);
  }

  protected clearSerie(): void {
    this.serieSearchCtrl.setValue('');
    this.form.get('serieId')!.setValue(null);
  }

  // ---------- Manga (autocompletado, solo manga) ----------

  protected onMangaSelected(event: MatAutocompleteSelectedEvent): void {
    const manga = event.option.value as Manga;
    this.form.get('mangaId')!.setValue(manga.id);
  }

  protected clearManga(): void {
    this.mangaSearchCtrl.setValue('');
    this.form.get('mangaId')!.setValue(null);
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
    this.addAuthor(created);
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
    this.editorialSearchCtrl.setValue(created);
    this.form.get('editorialId')!.setValue(created.id);
    this.quickEditorialForm.reset({ name: '', country: COUNTRY.SPAIN, website: '' });
    this.showQuickEditorial.set(false);
  }

  // ---------- Alta rápida: serie de libro ----------

  protected toggleQuickSerie(): void {
    this.showQuickSerie.update((v) => !v);
  }

  protected async createQuickSerie(): Promise<void> {
    if (this.quickSerieForm.invalid) {
      this.quickSerieForm.markAllAsTouched();
      return;
    }
    const value = this.quickSerieForm.getRawValue();
    const created = await this.bookSerieSrv.create({
      title: value.title,
      editorialId: value.editorialId!,
    });
    this.series.update((list) => [...list, created].sort((a, b) => a.title.localeCompare(b.title)));
    this.serieSearchCtrl.setValue(created);
    this.form.get('serieId')!.setValue(created.id);
    this.quickSerieForm.reset({ title: '', editorialId: null });
    this.showQuickSerie.set(false);
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
    this.mangaSearchCtrl.setValue(created);
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
