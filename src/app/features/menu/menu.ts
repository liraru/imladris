import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { APP_ROUTES } from '../../shared/constants/routes.constant';
import { NgForOf } from '../../../../node_modules/@angular/common/types/_common_module-chunk';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatToolbarModule, MatTabsModule],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  protected readonly ROUTES = Object.entries(APP_ROUTES).map(([key, value]) => value);
}
