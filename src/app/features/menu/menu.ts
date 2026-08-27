import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_ROUTES } from '../../shared/constants/routes.constant';

@Component({
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatTabsModule],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  protected readonly ROUTES = Object.entries(APP_ROUTES).map(([key, value]) => ({
    title: value.title,
    path: value.path,
  }));
}
