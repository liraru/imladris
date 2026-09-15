import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login-dialog.html',
  styleUrl: './login-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialog {
  private readonly _dialogRef = inject(MatDialogRef<LoginDialog, boolean>);
  private readonly _authService = inject(AuthService);
  private readonly _fb = inject(FormBuilder);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly hidePassword = signal(true);

  protected readonly form = this._fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected async submit(): Promise<void> {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);
    this.error.set(null);

    const { email, password } = this.form.getRawValue();

    try {
      await this._authService.signIn(email, password);
      this._dialogRef.close(true);
    } catch {
      this.error.set('Usuario o contraseña incorrectos.');
    } finally {
      this.loading.set(false);
    }
  }

  protected cancel(): void {
    this._dialogRef.close(false);
  }

  protected togglePasswordVisibility(): void {
    this.hidePassword.update((v) => !v);
  }
}
