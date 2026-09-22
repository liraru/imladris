import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FandomService } from '../../../../services/fandom.service';
import { FanficInput, FanficService } from '../../../../services/fanfic.service';
import { ShipService } from '../../../../services/ship.service';

import {
  LANGUAGE,
  LANGUAGE_LABELS,
  RATING,
  RATING_LABELS,
  READING_STATUS,
  READING_STATUS_LABELS,
} from '@shared/constants';
import { Fandom, Fanfic, Ship } from '@shared/models';
import { FORM_MODE, FORM_MODE_LABELS } from '../../constants/library-form.constants';

export interface FanficFormModalData {
  mode: FORM_MODE;
  /** Id del fanfic. Requerido en modo EDICION. */
  fanficId?: number;
}

export interface FanficFormModalResult {
  saved: boolean;
}

function toDate(value?: string): Date | null {
  return value ? new Date(`${value}T00:00:00`) : null;
}

function toStringList(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

@Component({
  selector: 'app-fanfic-form-modal',
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
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } },
  ],
  templateUrl: './fanfic-form-modal.html',
  styleUrl: './fanfic-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FanficFormModal implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<FanficFormModal, FanficFormModalResult>);
  protected readonly data = inject<FanficFormModalData>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  private readonly fandomSrv = inject(FandomService);
  private readonly shipSrv = inject(ShipService);
  private readonly fanficSrv = inject(FanficService);

  protected readonly FORM_MODE = FORM_MODE;
  protected readonly formModeLabels = FORM_MODE_LABELS;
  protected readonly languageLabels = LANGUAGE_LABELS;
  protected readonly readingStatusLabels = READING_STATUS_LABELS;
  protected readonly ratingLabels = RATING_LABELS;

  protected readonly languages = Object.values(LANGUAGE);
  protected readonly readingStatuses = Object.values(READING_STATUS);
  protected readonly ratings = Object.values(RATING);

  protected readonly mode = signal<FORM_MODE>(this.data.mode);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly fandoms = signal<Fandom[]>([]);
  protected readonly ships = signal<Ship[]>([]);

  /** Fandoms/ships ya elegidos para este fanfic (N:M, en vez de un único valor). */
  protected readonly selectedFandoms = signal<Fandom[]>([]);
  protected readonly selectedShips = signal<Ship[]>([]);

  protected readonly showQuickFandom = signal(false);
  protected readonly showQuickShip = signal(false);

  protected readonly quickFandomForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    origin: ['', Validators.required],
  });

  protected readonly quickShipForm = this.fb.nonNullable.group({
    characters: ['', Validators.required],
    fandomId: [null as number | null, Validators.required],
  });

  protected readonly form = this.fb.group({
    title: ['', Validators.required],
    authors: ['', Validators.required],
    rating: [RATING.NR, Validators.required],
    words: [0, [Validators.required, Validators.min(0)]],
    chapters: [1, [Validators.required, Validators.min(1)]],
    pages: [null as number | null],
    readingStatus: [READING_STATUS.NOT_STARTED, Validators.required],
    language: [LANGUAGE.EN, Validators.required],
    triggerWarnings: [''],
    tags: [''],
    summary: [''],
    fileUrl: [''],
    originalUrl: [''],
    coverUrl: [''],
    releaseDate: [null as Date | null],
    adquisitionDate: [null as Date | null],
    startDate: [null as Date | null],
    finishDate: [null as Date | null],
    notes: [''],
  });

  /**
   * `form.invalid` no es una signal: leerla dentro de un `computed()` no la registra como
   * dependencia, así que ese computed no se recalcularía al cambiar la validez del form si
   * ningún otro signal leído dentro cambia a la vez (bug real: el botón "Añadir" se quedaba
   * deshabilitado aunque el formulario ya fuera válido). Se expone el estado como signal vía
   * `toSignal(statusChanges)` para que `canSubmit` sí reaccione a cada cambio de validez.
   */
  private readonly formStatus = toSignal(this.form.statusChanges, {
    initialValue: this.form.status,
  });

  protected readonly fandomSearchCtrl = new FormControl('', { nonNullable: true });
  private readonly fandomQuery = toSignal(this.fandomSearchCtrl.valueChanges, { initialValue: '' });
  /** Fandoms disponibles para añadir: excluye los ya seleccionados y filtra por texto de búsqueda. */
  protected readonly filteredFandoms = computed(() => {
    const search = this.fandomQuery().toLowerCase();
    const selectedIds = new Set(this.selectedFandoms().map((f) => f.id));
    const available = this.fandoms().filter((f) => !selectedIds.has(f.id));
    if (!search) return available.slice(0, 30);
    return available.filter((f) => f.name.toLowerCase().includes(search)).slice(0, 30);
  });

  protected readonly shipSearchCtrl = new FormControl('', { nonNullable: true });
  private readonly shipQuery = toSignal(this.shipSearchCtrl.valueChanges, { initialValue: '' });
  /** Solo se pueden elegir ships de alguno de los fandoms ya seleccionados. */
  protected readonly shipsForFandom = computed(() => {
    const fandomIds = new Set(this.selectedFandoms().map((f) => f.id));
    return this.ships().filter((s) => fandomIds.has(s.fandom.id));
  });
  /** Ships disponibles para añadir: excluye los ya seleccionados y filtra por texto de búsqueda. */
  protected readonly filteredShips = computed(() => {
    const search = this.shipQuery().toLowerCase();
    const selectedIds = new Set(this.selectedShips().map((s) => s.id));
    const available = this.shipsForFandom().filter((s) => !selectedIds.has(s.id));
    if (!search) return available.slice(0, 30);
    return available
      .filter((s) => s.characters.join(' / ').toLowerCase().includes(search))
      .slice(0, 30);
  });

  protected readonly canSubmit = computed(
    () =>
      !this.saving() &&
      !this.loading() &&
      this.formStatus() !== 'INVALID' &&
      this.selectedFandoms().length > 0 &&
      this.selectedShips().length > 0,
  );

  async ngOnInit(): Promise<void> {
    this.loading.set(true);
    try {
      const [fandoms, ships] = await Promise.all([this.fandomSrv.getAll(), this.shipSrv.getAll()]);
      this.fandoms.set(fandoms);
      this.ships.set(ships);

      if (this.data.fanficId != null) {
        const fanfic = await this.fanficSrv.getById(this.data.fanficId);
        if (fanfic) this._patchForm(fanfic);
      }
    } catch (err) {
      this.error.set('No se ha podido cargar el fanfic. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  private _patchForm(fanfic: Fanfic): void {
    this.form.patchValue({
      title: fanfic.title,
      authors: fanfic.authors.join(', '),
      rating: fanfic.rating,
      words: fanfic.words,
      chapters: fanfic.chapters,
      pages: fanfic.pages ?? null,
      readingStatus: fanfic.readingStatus,
      language: fanfic.language,
      triggerWarnings: (fanfic.triggerWarnings ?? []).join(', '),
      tags: (fanfic.tags ?? []).join(', '),
      summary: fanfic.summary ?? '',
      fileUrl: fanfic.fileUrl ?? '',
      originalUrl: fanfic.originalUrl ?? '',
      coverUrl: fanfic.coverUrl ?? '',
      releaseDate: toDate(fanfic.releaseDate),
      adquisitionDate: toDate(fanfic.adquisitionDate),
      startDate: toDate(fanfic.startDate),
      finishDate: toDate(fanfic.finishDate),
      notes: fanfic.notes ?? '',
    });
    this.selectedFandoms.set(fanfic.fandoms);
    this.selectedShips.set(fanfic.ships);
  }

  // ---------- Fandoms ----------

  protected onFandomSelected(event: MatAutocompleteSelectedEvent): void {
    const fandom = event.option.value as Fandom;
    this.selectedFandoms.update((list) =>
      list.some((f) => f.id === fandom.id) ? list : [...list, fandom],
    );
    this.fandomSearchCtrl.setValue('');
  }

  protected removeFandom(fandom: Fandom): void {
    this.selectedFandoms.update((list) => list.filter((f) => f.id !== fandom.id));
    // Al quitar un fandom, los ships que pertenecían solo a él dejan de ser válidos.
    this.selectedShips.update((list) => list.filter((s) => s.fandom.id !== fandom.id));
  }

  protected toggleQuickFandom(): void {
    this.showQuickFandom.update((v) => !v);
  }

  protected async createQuickFandom(): Promise<void> {
    if (this.quickFandomForm.invalid) {
      this.quickFandomForm.markAllAsTouched();
      return;
    }
    const value = this.quickFandomForm.getRawValue();
    const created = await this.fandomSrv.create({ name: value.name, origin: value.origin });
    this.fandoms.update((list) => [...list, created].sort((a, b) => a.name.localeCompare(b.name)));
    this.selectedFandoms.update((list) => [...list, created]);
    this.quickFandomForm.reset({ name: '', origin: '' });
    this.showQuickFandom.set(false);
  }

  // ---------- Ships ----------

  protected onShipSelected(event: MatAutocompleteSelectedEvent): void {
    const ship = event.option.value as Ship;
    this.selectedShips.update((list) =>
      list.some((s) => s.id === ship.id) ? list : [...list, ship],
    );
    this.shipSearchCtrl.setValue('');
  }

  protected removeShip(ship: Ship): void {
    this.selectedShips.update((list) => list.filter((s) => s.id !== ship.id));
  }

  protected toggleQuickShip(): void {
    this.showQuickShip.update((v) => !v);
  }

  protected async createQuickShip(): Promise<void> {
    if (this.quickShipForm.invalid) {
      this.quickShipForm.markAllAsTouched();
      return;
    }
    const value = this.quickShipForm.getRawValue();
    const created = await this.shipSrv.create({
      characters: toStringList(value.characters),
      fandomId: value.fandomId!,
    });
    this.ships.update((list) => [...list, created]);
    this.selectedShips.update((list) => [...list, created]);
    this.quickShipForm.reset({ characters: '', fandomId: null });
    this.showQuickShip.set(false);
  }

  // ---------- Guardar ----------

  protected async save(): Promise<void> {
    if (!this.canSubmit()) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const input: FanficInput = {
      title: raw.title!.trim(),
      authors: toStringList(raw.authors!),
      fandomIds: this.selectedFandoms().map((f) => f.id),
      shipIds: this.selectedShips().map((s) => s.id),
      rating: raw.rating!,
      words: raw.words!,
      chapters: raw.chapters!,
      pages: raw.pages ?? undefined,
      readingStatus: raw.readingStatus!,
      language: raw.language!,
      triggerWarnings: raw.triggerWarnings ? toStringList(raw.triggerWarnings) : undefined,
      tags: raw.tags ? toStringList(raw.tags) : undefined,
      summary: raw.summary?.trim() || undefined,
      fileUrl: raw.fileUrl?.trim() || undefined,
      originalUrl: raw.originalUrl?.trim() || undefined,
      coverUrl: raw.coverUrl?.trim() || undefined,
      releaseDate: raw.releaseDate ?? undefined,
      adquisitionDate: raw.adquisitionDate ?? undefined,
      startDate: raw.startDate ?? undefined,
      finishDate: raw.finishDate ?? undefined,
      notes: raw.notes?.trim() || undefined,
    };

    this.saving.set(true);
    try {
      if (this.mode() === FORM_MODE.EDICION && this.data.fanficId != null) {
        await this.fanficSrv.update(this.data.fanficId, input);
      } else {
        await this.fanficSrv.create(input);
      }
      this.dialogRef.close({ saved: true });
    } catch (err) {
      this.error.set('No se ha podido guardar el fanfic. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.saving.set(false);
    }
  }

  protected cancel(): void {
    this.dialogRef.close({ saved: false });
  }
}
