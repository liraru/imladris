import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface CalculatorConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  /** 'tertiary' para acciones afirmativas (guardar); 'secondary' para destructivas. */
  confirmColor?: 'tertiary' | 'secondary';
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './calculator-confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<CalculatorConfirmDialogComponent>);
  readonly data = inject<CalculatorConfirmDialogData>(MAT_DIALOG_DATA);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
