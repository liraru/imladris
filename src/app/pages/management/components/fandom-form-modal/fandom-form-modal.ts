import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FandomService } from '../../../../services/fandom.service';
import { Fandom } from '@shared/models';
import { FORM_MODE, FORM_MODE_LABELS } from '../../constants/management-form.constants';
import { confirmDiscardChanges } from '../../../../shared/utils/confirm-discard.util';

export interface FandomFormModalData {
  mode: FORM_MODE;
  fandom?: Fandom;
}

export type FandomFormModalResult = boolean;

@Component({
  selector: 'app-fandom-form-modal',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './fandom-form-modal.html',
  styleUrl: './fandom-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FandomFormModal implements OnInit {
  private readonly _dialogRef = inject(MatDialogRef<FandomFormModal, FandomFormModalResult>);
  protected readonly data = inject<FandomFormModalData>(MAT_DIALOG_DATA);
  private readonly _fb = inject(FormBuilder);
  private readonly _service = inject(FandomService);
  private readonly _dialog = inject(MatDialog);

  protected readonly FORM_MODE = FORM_MODE;
  protected readonly formModeLabels = FORM_MODE_LABELS;

  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this._fb.nonNullable.group({
    name: ['', Validators.required],
    origin: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.data.mode === FORM_MODE.EDICION && this.data.fandom) {
      this.form.patchValue({
        name: this.data.fandom.name,
        origin: this.data.fandom.origin,
      });
    }
  }

  protected async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    const value = this.form.getRawValue();

    try {
      if (this.data.mode === FORM_MODE.EDICION && this.data.fandom) {
        await this._service.update(this.data.fandom.id, {
          name: value.name,
          origin: value.origin,
        });
      } else {
        await this._service.create({
          name: value.name,
          origin: value.origin,
        });
      }
      this._dialogRef.close(true);
    } catch (err) {
      this.error.set('No se ha podido guardar el fandom. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.saving.set(false);
    }
  }

  protected async cancel(): Promise<void> {
    if (await confirmDiscardChanges(this._dialog, this.form)) {
      this._dialogRef.close(false);
    }
  }
}
