import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
import { confirmDiscardChanges } from '../../utils/confirm-discard.util';

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
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
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
  protected readonly data = inject<ReadingProgressFormModalData>(MAT_DIALOG_DATA);

  protected readonly isEdit = !!this.data.progress;
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly minDate = this._parseDate(this.data.reading.startDate);
  protected readonly maxDate = this.data.reading.endDate
    ? this._parseDate(this.data.reading.endDate)
    : null;

  /** Cuál de los dos campos ha editado el usuario por última vez: determina cuál se envía como origen al guardar. */
  private _lastEdited: 'page' | 'percentage' | null = null;

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
  });

  ngOnInit(): void {
    if (this.data.progress) {
      this.form.patchValue(
        { recordDate: this._parseDate(this.data.progress.recordDate) },
        { emitEvent: false },
      );
    }
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

  protected async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    if (raw.page == null && raw.percentage == null) {
      this.error.set('Indica una página o un porcentaje.');
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    try {
      const source = this._lastEdited ?? (raw.page != null ? 'page' : 'percentage');
      const input = {
        readingId: this.data.reading.id,
        recordDate: this._toDateString(raw.recordDate),
        page: source === 'page' ? (raw.page ?? undefined) : undefined,
        percentage: source === 'percentage' ? (raw.percentage ?? undefined) : undefined,
      };

      if (this.isEdit) {
        await this._service.update(this.data.progress!.id, this.data.reading.pages, input);
      } else {
        await this._service.create(this.data.reading.pages, input);
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
