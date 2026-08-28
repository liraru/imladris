import { Routes } from '@angular/router';
import { ROUTES } from './shared/constants/routes.constant';

export const routes: Routes = [
  {
    path: ROUTES.HOME,
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: ROUTES.CALCULATOR,
    loadComponent: () =>
      import('./pages/calculator/pages-calculator.component').then(
        (m) => m.PagesCalculatorComponent,
      ),
  },
  {
    path: ROUTES.LIBRARY,
    loadComponent: () => import('./pages/library/library').then((m) => m.Library),
  },
  {
    path: ROUTES.YEARLY_READINGS,
    loadComponent: () =>
      import('./pages/yearly-readings/yearly-readings').then((m) => m.YearlyReadings),
  },
  {
    path: ROUTES.MANAGEMENT,
    loadComponent: () => import('./pages/management/management').then((m) => m.Management),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
