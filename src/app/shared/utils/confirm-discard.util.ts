import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialog } from '../components/confirm-dialog/confirm-dialog';

/**
 * Si el formulario tiene cambios sin guardar (`form.dirty`), pregunta "¿Deseas irte sin
 * guardar?" antes de cerrar. Devuelve `true` si se puede cerrar la modal (formulario limpio
 * o confirmación aceptada), `false` si el usuario ha decidido seguir editando.
 */
export async function confirmDiscardChanges(dialog: MatDialog, form: FormGroup): Promise<boolean> {
  if (!form.dirty) return true;

  const ref = dialog.open(ConfirmDialog, {
    width: '400px',
    maxWidth: '95vw',
    data: {
      title: 'Cambios sin guardar',
      message: '¿Deseas irte sin guardar?',
      confirmText: 'Salir sin guardar',
      cancelText: 'Seguir editando',
      confirmColor: 'secondary',
    },
  });

  return (await firstValueFrom(ref.afterClosed())) ?? false;
}
