import { Routes } from '@angular/router';
import { ROUTES } from './shared/constants/routes.constant';

export const routes: Routes = [
  {
    path: ROUTES.HOME,
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: ROUTES.CALCULATOR,
    loadComponent: () =>
      import('./features/calculator/pages/pages-calculator/pages-calculator.component').then(
        (m) => m.PagesCalculatorComponent,
      ),
  },
  {
    path: ROUTES.LIBRARY,
    loadComponent: () => import('./features/library/library').then((m) => m.Library),
  },
  {
    path: ROUTES.YEARLY_READINGS,
    loadComponent: () =>
      import('./features/yearly-readings/yearly-readings').then((m) => m.YearlyReadings),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
