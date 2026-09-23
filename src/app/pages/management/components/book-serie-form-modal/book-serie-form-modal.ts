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

import { BookSerieService } from '../../../../services/book-serie.service';
import { EditorialService } from '../../../../services/editorial.service';
import { BookSerie, Editorial } from '@shared/models';
import { FORM_MODE, FORM_MODE_LABELS } from '../../constants/management-form.constants';
import { confirmDiscardChanges } from '../../../../shared/utils/confirm-discard.util';

export interface BookSerieFormModalData {
  mode: FORM_MODE;
  serie?: BookSerie;
}

export type BookSerieFormModalResult = boolean;

@Component({
  selector: 'app-book-serie-form-modal',
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
  templateUrl: './book-serie-form-modal.html',
  styleUrl: './book-serie-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSerieFormModal implements OnInit {
  private readonly _dialogRef = inject(MatDialogRef<BookSerieFormModal, BookSerieFormModalResult>);
  protected readonly data = inject<BookSerieFormModalData>(MAT_DIALOG_DATA);
  private readonly _fb = inject(FormBuilder);
  private readonly _service = inject(BookSerieService);
  private readonly _editorialSrv = inject(EditorialService);
  private readonly _dialog = inject(MatDialog);

  protected readonly FORM_MODE = FORM_MODE;
  protected readonly formModeLabels = FORM_MODE_LABELS;

  protected readonly editorials = signal<Editorial[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this._fb.nonNullable.group({
    title: ['', Validators.required],
    editorialId: [0, Validators.required],
  });

  async ngOnInit(): Promise<void> {
    try {
      const editorials = await this._editorialSrv.getAll();
      this.editorials.set(editorials);

      if (this.data.mode === FORM_MODE.EDICION && this.data.serie) {
        this.form.patchValue({
          title: this.data.serie.title,
          editorialId: this.data.serie.editorial.id,
        });
      } else if (editorials.length > 0) {
        this.form.patchValue({ editorialId: editorials[0].id });
      }
    } catch (err) {
      this.error.set('No se pudieron cargar las editoriales.');
      console.error(err);
    } finally {
      this.loading.set(false);
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
      if (this.data.mode === FORM_MODE.EDICION && this.data.serie) {
        await this._service.update(this.data.serie.id, {
          title: value.title,
          editorialId: value.editorialId,
        });
      } else {
        await this._service.create({ title: value.title, editorialId: value.editorialId });
      }
      this._dialogRef.close(true);
    } catch (err) {
      this.error.set('No se ha podido guardar la serie. Inténtalo de nuevo.');
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
