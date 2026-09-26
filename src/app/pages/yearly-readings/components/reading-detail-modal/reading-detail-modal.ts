import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { YearlyReading } from '@shared/models';
import { ThousandsPipe } from '../../../../shared/pipes/thousands.pipe';

export interface ReadingDetailModalData {
  reading: YearlyReading;
}

export interface ReadingDetailModalResult {
  /** `true` si el usuario ha pulsado "Editar": el llamante debe abrir el formulario en modo edición. */
  edit: boolean;
}

@Component({
  selector: 'app-reading-detail-modal',
  imports: [DatePipe, MatButtonModule, MatDialogModule, MatIconModule, ThousandsPipe],
  templateUrl: './reading-detail-modal.html',
  styleUrl: './reading-detail-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingDetailModal {
  private readonly _dialogRef = inject(MatDialogRef<ReadingDetailModal, ReadingDetailModalResult>);
  protected readonly data = inject<ReadingDetailModalData>(MAT_DIALOG_DATA);

  protected readonly reading = this.data.reading;

  protected close(): void {
    this._dialogRef.close({ edit: false });
  }

  protected edit(): void {
    this._dialogRef.close({ edit: true });
  }
}
