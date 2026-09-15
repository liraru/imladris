import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  IsActiveMatchOptions,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { APP_ROUTES } from '@shared/constants';
import { filter, map, startWith } from 'rxjs';
import { AuthService } from './services/auth.service';
import { LoginDialog } from './shared/components/login-dialog/login-dialog';
import { ROUTES } from './shared/constants/routes.constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private _router = inject(Router);
  private readonly _dialog = inject(MatDialog);

  protected readonly authService = inject(AuthService);
  protected readonly title = 'imladris';

  /**
   * Fuera de la plantilla para que `@for` no tenga que interpretar llaves `{ }` de un
   * objeto literal dentro de su propio bloque de control (confunde al parser de bloques).
   */
  protected readonly exactMatch: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  /** Oculta la pestaña "Gestión" del menú si no hay sesión de administrador activa. */
  protected readonly ROUTES = computed(() =>
    Object.entries(APP_ROUTES)
      .filter(([key]) => key !== 'MANAGEMENT' || this.authService.isAdmin())
      .map(([, value]) => ({ title: value.title, path: value.path })),
  );

  /**
   * Solo se usa para cerrar el menú móvil al navegar. El resaltado de la pestaña activa
   * ahora lo gestiona `routerLinkActive` directamente en la plantilla, más fiable en modo
   * zoneless que compararlo manualmente en cada ciclo de detección de cambios.
   */
  private readonly _currentUrl = toSignal(
    this._router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this._router.url),
    ),
    { initialValue: this._router.url },
  );

  /** Controla la visibilidad del menú de navegación en vista móvil (botón "hamburguesa"). */
  protected readonly mobileMenuOpen = signal(false);

  constructor() {
    // Cierra el menú móvil automáticamente al navegar a otra ruta.
    effect(() => {
      this._currentUrl();
      this.mobileMenuOpen.set(false);
    });
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected openLogin(): void {
    this._dialog.open(LoginDialog, { width: '380px', autoFocus: true });
  }

  protected async logout(): Promise<void> {
    await this.authService.signOut();
    if (this._router.url === `/${ROUTES.MANAGEMENT}`) {
      this._router.navigateByUrl(`/${ROUTES.LIBRARY}`);
    }
  }
}
