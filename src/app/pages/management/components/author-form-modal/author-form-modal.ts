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
import { MatSelectModule } from '@angular/material/select';

import { AuthorService } from '../../../../services/author.service';
import { Author } from '@shared/models';
import { COUNTRY, COUNTRY_LABELS } from '../../../../shared/constants/countries.constant';
import { FORM_MODE, FORM_MODE_LABELS } from '../../constants/management-form.constants';
import { confirmDiscardChanges } from '../../../../shared/utils/confirm-discard.util';

export interface AuthorFormModalData {
  mode: FORM_MODE;
  author?: Author;
}

export type AuthorFormModalResult = boolean;

@Component({
  selector: 'app-author-form-modal',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './author-form-modal.html',
  styleUrl: './author-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorFormModal implements OnInit {
  private readonly _dialogRef = inject(MatDialogRef<AuthorFormModal, AuthorFormModalResult>);
  protected readonly data = inject<AuthorFormModalData>(MAT_DIALOG_DATA);
  private readonly _fb = inject(FormBuilder);
  private readonly _service = inject(AuthorService);
  private readonly _dialog = inject(MatDialog);

  protected readonly FORM_MODE = FORM_MODE;
  protected readonly formModeLabels = FORM_MODE_LABELS;
  protected readonly countries = Object.values(COUNTRY);
  protected readonly countryLabels = COUNTRY_LABELS;

  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this._fb.nonNullable.group({
    name: ['', Validators.required],
    country: [COUNTRY.SPAIN, Validators.required],
    notes: [''],
  });

  ngOnInit(): void {
    if (this.data.mode === FORM_MODE.EDICION && this.data.author) {
      this.form.patchValue({
        name: this.data.author.name,
        country: this.data.author.country,
        notes: this.data.author.notes ?? '',
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
      if (this.data.mode === FORM_MODE.EDICION && this.data.author) {
        await this._service.update(this.data.author.id, {
          name: value.name,
          country: value.country,
          notes: value.notes || undefined,
        });
      } else {
        await this._service.create({
          name: value.name,
          country: value.country,
          notes: value.notes || undefined,
        });
      }
      this._dialogRef.close(true);
    } catch (err) {
      this.error.set('No se ha podido guardar el autor. Inténtalo de nuevo.');
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
