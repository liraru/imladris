import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReadingProgress, YearlyReading } from '@shared/models';
import { ReadingProgressService } from '../../../services/reading-progress.service';
import { YearlyReadingService } from '../../../services/yearly-reading.service';
import { ThousandsPipe } from '../../pipes/thousands.pipe';
import { confirmDiscardChanges } from '../../utils/confirm-discard.util';

/**
 * Misma clave de `localStorage` que usa la calculadora de Folio
 * (`pages-calculator.component.ts`): la posición total se comparte entre ambas.
 */
const KINDLE_STORAGE_KEY = 'folio:kindle-data';

/** Lee el estado completo de la calculadora para no pisar el resto de sus campos (páginas, historial) al guardar. */
function readKindleState(): Record<string, unknown> {
  try {
    const raw = localStorage.getItem(KINDLE_STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
  } catch (e) {
    console.warn('No se pudo leer el almacenamiento local:', e);
    return {};
  }
}

function loadStoredTotalPosition(): number | null {
  const value = readKindleState()['totalPosition'];
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function saveStoredTotalPosition(value: number | null): void {
  try {
    localStorage.setItem(
      KINDLE_STORAGE_KEY,
      JSON.stringify({ ...readKindleState(), totalPosition: value }),
    );
  } catch (e) {
    console.error('No se pudo guardar la posición total:', e);
  }
}

export interface ReadingProgressFormModalData {
  reading: YearlyReading;
  /** Si se informa, la modal se abre en modo edición sobre este registro. */
  progress?: ReadingProgress;
}

@Component({
  selector: 'app-reading-progress-form-modal',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ThousandsPipe,
  ],
  templateUrl: './reading-progress-form-modal.html',
  styleUrl: './reading-progress-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingProgressFormModal implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _dialogRef = inject(MatDialogRef<ReadingProgressFormModal>);
  private readonly _dialog = inject(MatDialog);
  private readonly _service = inject(ReadingProgressService);
  private readonly _yearlyReadingSrv = inject(YearlyReadingService);
  protected readonly data = inject<ReadingProgressFormModalData>(MAT_DIALOG_DATA);

  protected readonly isEdit = !!this.data.progress;
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  /** "Marcar como completado" solo tiene sentido mientras la lectura sigue en curso (sin fecha de fin). */
  protected readonly canComplete = !this.data.reading.endDate;

  protected readonly minDate = this._parseDate(this.data.reading.startDate);
  protected readonly maxDate = this.data.reading.endDate
    ? this._parseDate(this.data.reading.endDate)
    : null;

  /** Cuál de los dos campos ha editado el usuario por última vez: determina cuál se envía como origen al guardar. */
  private _lastEdited: 'page' | 'percentage' | null = null;

  /** Valores de página/porcentaje previos a marcar "completado", para restaurarlos al desmarcarlo. */
  private _beforeCompleted: {
    page: number | null;
    percentage: number | null;
    lastEdited: 'page' | 'percentage' | null;
  } | null = null;

  protected readonly form = this._fb.nonNullable.group({
    recordDate: [new Date(), [Validators.required, this._dateInRangeValidator()]],
    page: [
      this.data.progress?.page ?? (null as number | null),
      [Validators.min(0), Validators.max(this.data.reading.pages)],
    ],
    percentage: [
      this.data.progress?.percentage ?? (null as number | null),
      [Validators.min(0), Validators.max(100)],
    ],
    completed: [false],
  });

  // ---------- Calculadora de página (posición Kindle → página) ----------

  /** Panel desplegable de la calculadora: oculto por defecto. */
  protected readonly calcOpen = signal(false);

  /**
   * Controles fuera del `form` principal a propósito: así no ensucian el formulario
   * ni se envían al guardar, y no afectan a la pregunta "¿Deseas irte sin guardar?".
   */
  protected readonly calcCurrentPosition = new FormControl<number | null>(null);
  protected readonly calcTotalPosition = new FormControl<number | null>(loadStoredTotalPosition());

  private readonly _calcCurrent = toSignal(this.calcCurrentPosition.valueChanges, {
    initialValue: this.calcCurrentPosition.value,
  });
  private readonly _calcTotal = toSignal(this.calcTotalPosition.valueChanges, {
    initialValue: this.calcTotalPosition.value,
  });

  /**
   * Misma fórmula que la calculadora de Folio:
   * `Math.round(posicionActual / (posicionTotal / paginasTotales))`,
   * con las páginas totales tomadas de la propia lectura.
   */
  private readonly _calc = computed<{ page: number | null; error: string | null } | null>(() => {
    const current = this._calcCurrent();
    const total = this._calcTotal();
    const pages = this.data.reading.pages;

    if (current == null) return null;

    if (!Number.isFinite(current) || current < 0) {
      return { page: null, error: 'Introduce una posición actual válida.' };
    }
    if (total == null || !Number.isFinite(total) || total <= 0) {
      return { page: null, error: 'Indica la posición total del libro.' };
    }
    if (!Number.isFinite(pages) || pages <= 0) {
      return { page: null, error: 'La lectura no tiene páginas totales definidas.' };
    }
    if (current > total) {
      return { page: null, error: 'La posición actual no puede superar la posición total.' };
    }

    return { page: Math.round(current / (total / pages)), error: null };
  });

  protected readonly calcPage = computed(() => this._calc()?.page ?? null);
  protected readonly calcError = computed(() => this._calc()?.error ?? null);

  ngOnInit(): void {
    if (this.data.progress) {
      this.form.patchValue(
        { recordDate: this._parseDate(this.data.progress.recordDate) },
        { emitEvent: false },
      );
    }
  }

  protected toggleCalc(): void {
    this.calcOpen.update((open) => !open);
  }

  /** Guarda la posición total al confirmarla (blur/enter), igual que en la calculadora. */
  protected onCalcTotalPositionChange(): void {
    saveStoredTotalPosition(this.calcTotalPosition.value);
  }

  /** Vuelca la página calculada en el campo "Página", recalcula el porcentaje y oculta el panel. */
  protected applyCalculatedPage(): void {
    const page = this.calcPage();
    if (page == null || this.calcError()) return;

    saveStoredTotalPosition(this.calcTotalPosition.value);

    const { page: pageControl, percentage } = this.form.controls;
    pageControl.setValue(page);
    pageControl.markAsDirty();
    pageControl.markAsTouched();
    percentage.markAsDirty();
    // Fija el origen en "página" y recalcula el porcentaje, como si se hubiera escrito a mano.
    this.onPageInput();

    this.calcOpen.set(false);
  }

  /** Recalcula el porcentaje en caliente al escribir la página, sin esperar a guardar. */
  protected onPageInput(): void {
    this._lastEdited = 'page';
    const page = this.form.controls.page.value;
    if (page == null || Number.isNaN(page)) return;
    this.form.controls.percentage.setValue(this._pageToPercentage(page), { emitEvent: false });
  }

  /** Recalcula la página en caliente al escribir el porcentaje, sin esperar a guardar. */
  protected onPercentageInput(): void {
    this._lastEdited = 'percentage';
    const percentage = this.form.controls.percentage.value;
    if (percentage == null || Number.isNaN(percentage)) return;
    this.form.controls.page.setValue(this._percentageToPage(percentage), { emitEvent: false });
  }

  /**
   * Al marcar "completado": página = total de la lectura, porcentaje = 100 y ambos campos
   * deshabilitados. Al desmarcarlo se rehabilitan y se recuperan los valores anteriores.
   */
  protected onCompletedChange(): void {
    const { page, percentage, completed } = this.form.controls;

    if (completed.value) {
      this._beforeCompleted = {
        page: page.value,
        percentage: percentage.value,
        lastEdited: this._lastEdited,
      };
      page.setValue(this.data.reading.pages, { emitEvent: false });
      percentage.setValue(100, { emitEvent: false });
      page.disable({ emitEvent: false });
      percentage.disable({ emitEvent: false });
      this._lastEdited = 'page';
    } else {
      page.enable({ emitEvent: false });
      percentage.enable({ emitEvent: false });
      if (this._beforeCompleted) {
        page.setValue(this._beforeCompleted.page, { emitEvent: false });
        percentage.setValue(this._beforeCompleted.percentage, { emitEvent: false });
        this._lastEdited = this._beforeCompleted.lastEdited;
        this._beforeCompleted = null;
      }
    }
  }

  protected async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // getRawValue incluye también los campos deshabilitados (página y porcentaje al completar).
    const raw = this.form.getRawValue();
    const completed = this.canComplete && raw.completed;

    if (!completed && raw.page == null && raw.percentage == null) {
      this.error.set('Indica una página o un porcentaje.');
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    try {
      const recordDate = this._toDateString(raw.recordDate);
      const source = completed
        ? 'page'
        : (this._lastEdited ?? (raw.page != null ? 'page' : 'percentage'));
      const input = {
        readingId: this.data.reading.id,
        recordDate,
        page:
          source === 'page'
            ? completed
              ? this.data.reading.pages
              : (raw.page ?? undefined)
            : undefined,
        percentage: source === 'percentage' ? (raw.percentage ?? undefined) : undefined,
      };

      if (this.isEdit) {
        await this._service.update(this.data.progress!.id, this.data.reading.pages, input);
      } else {
        await this._service.create(this.data.reading.pages, input);
      }

      if (completed) {
        await this._yearlyReadingSrv.update(this.data.reading.id, { endDate: recordDate });
      }
      this._dialogRef.close(true);
    } catch (e) {
      this.error.set('No se pudo guardar el avance. Inténtalo de nuevo.');
      console.error(e);
    } finally {
      this.saving.set(false);
    }
  }

  protected async cancel(): Promise<void> {
    if (await confirmDiscardChanges(this._dialog, this.form)) {
      this._dialogRef.close(false);
    }
  }

  private _pageToPercentage(page: number): number {
    const total = this.data.reading.pages;
    return total > 0 ? Math.round((page / total) * 10000) / 100 : 0;
  }

  private _percentageToPage(percentage: number): number {
    return Math.round((percentage / 100) * this.data.reading.pages);
  }

  private _dateInRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as Date | null;
      if (!value) return null;

      const day = new Date(value);
      day.setHours(0, 0, 0, 0);

      const start = new Date(this.minDate);
      start.setHours(0, 0, 0, 0);
      if (day < start) return { beforeStart: true };

      if (this.maxDate) {
        const end = new Date(this.maxDate);
        end.setHours(0, 0, 0, 0);
        if (day > end) return { afterEnd: true };
      }
      return null;
    };
  }

  private _toDateString(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private _parseDate(value: string): Date {
    const [y, m, d] = value.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
}
