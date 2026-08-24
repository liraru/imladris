import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () =>
      import('./features/calculator/pages/pages-calculator/pages-calculator.component').then(
        (m) => m.PagesCalculatorComponent,
      ),
  },
  {
    path: '**',
    redirectTo: ''
  }
];
