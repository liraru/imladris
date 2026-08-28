import { MenuRoute } from '../models/menu.model';

export enum ROUTES {
  HOME = '',
  CALCULATOR = 'calculator',
  LIBRARY = 'library',
  YEARLY_READINGS = 'yearly-readings',
  MANAGEMENT = 'management',
}

export const APP_ROUTES: { [key: string]: MenuRoute } = {
  HOME: { title: 'Inicio', path: ROUTES.HOME },
  CALCULATOR: { title: 'Calculadora', path: ROUTES.CALCULATOR },
  LIBRARY: { title: 'Biblioteca', path: ROUTES.LIBRARY },
  YEARLY_READINGS: { title: 'Lecturas Anuales', path: ROUTES.YEARLY_READINGS },
  MANAGEMENT: { title: 'Gestión', path: ROUTES.MANAGEMENT },
};
