import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Menu } from './features/menu/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, Menu, RouterOutlet, MatToolbarModule, MatTabsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'imladris';
}
