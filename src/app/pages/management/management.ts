import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Authors } from './components/authors/authors';
import { Editorials } from './components/editorials/editorials';
import { BookSeries } from './components/book-series/book-series';
import { Mangas } from './components/mangas/mangas';
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
  ],
  templateUrl: './management.html',
  styleUrl: './management.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Management {
  protected readonly MANAGEMENT_MASTER = MANAGEMENT_MASTER;
  protected readonly menuEntries = MANAGEMENT_MENU_ENTRIES;

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
}
