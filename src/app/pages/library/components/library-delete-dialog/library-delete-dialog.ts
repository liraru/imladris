import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TYPE } from '../../constants/library.consants';

export interface LibraryDeleteDialogData {
  type: TYPE;
  title: string;
  authorNames: string;
  editorialName: string;
  /** Solo para manga: número de tomo. */
  volumeNumber?: number;
  /** Solo para manga: notas del tomo. */
  notes?: string;
}

@Component({
  selector: 'app-library-delete-dialog',
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './library-delete-dialog.html',
  styleUrl: './library-delete-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryDeleteDialog {
  private readonly dialogRef = inject(MatDialogRef<LibraryDeleteDialog, boolean>);
  protected readonly data = inject<LibraryDeleteDialogData>(MAT_DIALOG_DATA);

  protected readonly TYPE = TYPE;

  protected onCancel(): void {
    this.dialogRef.close(false);
  }

  protected onConfirm(): void {
    this.dialogRef.close(true);
  }
}
