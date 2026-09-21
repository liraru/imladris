import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { ShipService } from '../../../../services/ship.service';
import { FandomService } from '../../../../services/fandom.service';
import { Fandom, Ship } from '@shared/models';
import { FORM_MODE, FORM_MODE_LABELS } from '../../constants/management-form.constants';

export interface ShipFormModalData {
  mode: FORM_MODE;
  ship?: Ship;
}

export type ShipFormModalResult = boolean;

function toStringList(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

@Component({
  selector: 'app-ship-form-modal',
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
  templateUrl: './ship-form-modal.html',
  styleUrl: './ship-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipFormModal implements OnInit {
  private readonly _dialogRef = inject(MatDialogRef<ShipFormModal, ShipFormModalResult>);
  protected readonly data = inject<ShipFormModalData>(MAT_DIALOG_DATA);
  private readonly _fb = inject(FormBuilder);
  private readonly _service = inject(ShipService);
  private readonly _fandomSrv = inject(FandomService);

  protected readonly FORM_MODE = FORM_MODE;
  protected readonly formModeLabels = FORM_MODE_LABELS;

  protected readonly fandoms = signal<Fandom[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this._fb.nonNullable.group({
    characters: ['', Validators.required],
    fandomId: [0, Validators.required],
  });

  async ngOnInit(): Promise<void> {
    try {
      const fandoms = await this._fandomSrv.getAll();
      this.fandoms.set(fandoms);

      if (this.data.mode === FORM_MODE.EDICION && this.data.ship) {
        this.form.patchValue({
          characters: this.data.ship.characters.join(', '),
          fandomId: this.data.ship.fandom.id,
        });
      } else if (fandoms.length > 0) {
        this.form.patchValue({ fandomId: fandoms[0].id });
      }
    } catch (err) {
      this.error.set('No se pudieron cargar los fandoms. Inténtalo de nuevo.');
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
      if (this.data.mode === FORM_MODE.EDICION && this.data.ship) {
        await this._service.update(this.data.ship.id, {
          characters: toStringList(value.characters),
          fandomId: value.fandomId,
        });
      } else {
        await this._service.create({
          characters: toStringList(value.characters),
          fandomId: value.fandomId,
        });
      }
      this._dialogRef.close(true);
    } catch (err) {
      this.error.set('No se ha podido guardar el ship. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.saving.set(false);
    }
  }

  protected cancel(): void {
    this._dialogRef.close(false);
  }
}
