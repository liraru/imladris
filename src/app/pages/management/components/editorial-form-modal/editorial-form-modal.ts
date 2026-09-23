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

import { EditorialService } from '../../../../services/editorial.service';
import { Editorial } from '@shared/models';
import { COUNTRY, COUNTRY_LABELS } from '../../../../shared/constants/countries.constant';
import { FORM_MODE, FORM_MODE_LABELS } from '../../constants/management-form.constants';
import { confirmDiscardChanges } from '../../../../shared/utils/confirm-discard.util';

export interface EditorialFormModalData {
  mode: FORM_MODE;
  editorial?: Editorial;
}

export type EditorialFormModalResult = boolean;

@Component({
  selector: 'app-editorial-form-modal',
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
  templateUrl: './editorial-form-modal.html',
  styleUrl: './editorial-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorialFormModal implements OnInit {
  private readonly _dialogRef = inject(MatDialogRef<EditorialFormModal, EditorialFormModalResult>);
  protected readonly data = inject<EditorialFormModalData>(MAT_DIALOG_DATA);
  private readonly _fb = inject(FormBuilder);
  private readonly _service = inject(EditorialService);
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
    website: [''],
    logo: [''],
  });

  ngOnInit(): void {
    if (this.data.mode === FORM_MODE.EDICION && this.data.editorial) {
      this.form.patchValue({
        name: this.data.editorial.name,
        country: this.data.editorial.country,
        website: this.data.editorial.website ?? '',
        logo: this.data.editorial.logo ?? '',
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
      if (this.data.mode === FORM_MODE.EDICION && this.data.editorial) {
        await this._service.update(this.data.editorial.id, {
          name: value.name,
          country: value.country,
          website: value.website || undefined,
          logo: value.logo || undefined,
        });
      } else {
        await this._service.create({
          name: value.name,
          country: value.country,
          website: value.website || undefined,
          logo: value.logo || undefined,
        });
      }
      this._dialogRef.close(true);
    } catch (err) {
      this.error.set('No se ha podido guardar la editorial. Inténtalo de nuevo.');
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
