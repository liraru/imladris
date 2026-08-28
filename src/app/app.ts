import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { APP_ROUTES } from '@shared/constants';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTabsModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private _router = inject(Router);

  protected readonly title = 'imladris';
  protected readonly ROUTES = Object.entries(APP_ROUTES).map(([key, value]) => ({
    title: value.title,
    path: value.path,
  }));

  // TODO: Use a signal to track the current URL and determine if a route is active
  protected readonly currentUrl = toSignal(
    this._router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this._router.url),
    ),
    { initialValue: this._router.url },
  );

  protected isActive(path: string): boolean {
    const normalized = `/${path}`;
    return this.currentUrl() === normalized;
  }
}
