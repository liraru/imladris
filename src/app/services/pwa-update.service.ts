import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

/**
 * Avisa cuando hay una versión nueva de la app descargada por el service worker
 * y ofrece recargar para usarla. También comprueba si hay novedades al volver a la ventana,
 * útil cuando la app instalada se queda abierta muchas horas.
 */
@Injectable({ providedIn: 'root' })
export class PwaUpdateService {
  private readonly _swUpdate = inject(SwUpdate);
  private readonly _snackBar = inject(MatSnackBar);

  constructor() {
    // En desarrollo (ng serve) el service worker está desactivado.
    if (!this._swUpdate.isEnabled) return;

    this._swUpdate.versionUpdates
      .pipe(filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'))
      .subscribe(() => {
        this._snackBar
          .open('Hay una nueva versión de Imladris disponible.', 'Recargar')
          .onAction()
          .subscribe(async () => {
            await this._swUpdate.activateUpdate();
            document.location.reload();
          });
      });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') return;
      this._swUpdate
        .checkForUpdate()
        .catch((e) => console.warn('No se pudo comprobar si hay una nueva versión:', e));
    });
  }
}
