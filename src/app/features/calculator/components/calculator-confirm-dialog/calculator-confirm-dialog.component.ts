import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'tertiary' | 'secondary';
}

@Component({
  imports: [MatDialogContent, MatDialogActions, MatButtonModule],
  selector: 'app-calculator-confirm-dialog',
  styleUrl: './calculator-confirm-dialog.component.css',
  templateUrl: './calculator-confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<CalculatorConfirmDialogComponent>);
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
