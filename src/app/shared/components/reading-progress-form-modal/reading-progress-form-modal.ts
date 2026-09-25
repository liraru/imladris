import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

  /** Cuál de los dos campos ha editado el usuario por última vez: determina cuál se envía como origen. */
  private _lastEdited: 'page' | 'percentage' | null = null;

  protected readonly form = this._fb.nonNullable.group({
    recordDate: [new Date(), Validators.required],
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
      const [y, m, d] = this.data.progress.recordDate.split('-').map(Number);
      this.form.patchValue({ recordDate: new Date(y, m - 1, d) }, { emitEvent: false });
    }
  }

  protected onPageInput(): void {
    this._lastEdited = 'page';
  }

  protected onPercentageInput(): void {
    this._lastEdited = 'percentage';
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

  private _toDateString(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
