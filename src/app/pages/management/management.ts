import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BackupService } from '../../services/backup.service';
import { PwaInstallService } from '../../services/pwa-install.service';
import { Authors } from './components/authors/authors';
import { Editorials } from './components/editorials/editorials';
import { BookSeries } from './components/book-series/book-series';
import { Mangas } from './components/mangas/mangas';
import { Fandoms } from './components/fandoms/fandoms';
import { Ships } from './components/ships/ships';
import { MANAGEMENT_MASTER, MANAGEMENT_MENU_ENTRIES } from './constants/management-menu.constants';

@Component({
  selector: 'app-management',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    Authors,
    Editorials,
    BookSeries,
    Mangas,
    Fandoms,
    Ships,
  ],
  templateUrl: './management.html',
  styleUrl: './management.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Management {
  private readonly _pwaInstall = inject(PwaInstallService);
  private readonly _backup = inject(BackupService);
  private readonly _snackBar = inject(MatSnackBar);

  protected readonly MANAGEMENT_MASTER = MANAGEMENT_MASTER;
  protected readonly menuEntries = MANAGEMENT_MENU_ENTRIES;

  /** `true` si el navegador permite instalar la app y aún no está instalada. */
  protected readonly canInstall = this._pwaInstall.canInstall;

  /** `true` mientras se genera el backup (evita lanzar dos descargas a la vez). */
  protected readonly backingUp = signal(false);

  protected readonly isMobile = toSignal(
    inject(BreakpointObserver)
      .observe('(max-width: 767px)')
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  protected readonly selectedMaster = signal<MANAGEMENT_MASTER>(MANAGEMENT_MASTER.AUTHORS);
  protected readonly collapsed = signal(false);
  protected readonly mobileMenuOpen = signal(false);

  protected readonly selectedLabel = computed(
    () => this.menuEntries.find((entry) => entry.master === this.selectedMaster())?.label ?? '',
  );

  protected selectMaster(master: MANAGEMENT_MASTER): void {
    this.selectedMaster.set(master);
    if (this.isMobile()) this.mobileMenuOpen.set(false);
  }

  protected toggleCollapsed(): void {
    this.collapsed.update((value) => !value);
  }

  protected toggleMenu(): void {
    if (this.isMobile()) {
      this.mobileMenuOpen.update((value) => !value);
    } else {
      this.toggleCollapsed();
    }
  }

  protected onSidenavOpenedChange(opened: boolean): void {
    if (!opened) this.mobileMenuOpen.set(false);
  }

  /** Lanza el diálogo nativo de instalación de la PWA. */
  protected installApp(): void {
    if (this.isMobile()) this.mobileMenuOpen.set(false);
    void this._pwaInstall.install();
  }

  /** Genera y descarga un backup (JSON) con todos los datos de la base de datos. */
  protected async downloadBackup(): Promise<void> {
    if (this.backingUp()) return;
    if (this.isMobile()) this.mobileMenuOpen.set(false);

    this.backingUp.set(true);
    try {
      const fileName = await this._backup.download();
      this._snackBar.open(`Backup descargado: ${fileName}`, 'Cerrar', { duration: 5000 });
    } catch (err) {
      console.error('No se pudo generar el backup:', err);
      this._snackBar.open('No se ha podido generar el backup. Inténtalo de nuevo.', 'Cerrar', {
        duration: 6000,
      });
    } finally {
      this.backingUp.set(false);
    }
  }
}
