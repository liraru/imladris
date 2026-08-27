enum ROUTES {
  HOME = '',
  CALCULATOR = 'calculator',
  LIBRARY = 'library',
  YEARLY_READINGS = 'yearly-readings',
}

export const APP_ROUTES: { title: string; path: ROUTES } = {
  HOME: { title: 'Inicio', path: ROUTES.HOME },
  CALCULATOR: { title: 'Calculadora', path: ROUTES.CALCULATOR },
  LIBRARY: { title: 'Biblioteca', path: ROUTES.LIBRARY },
  YEARLY_READINGS: { title: 'Lecturas Anuales', path: ROUTES.YEARLY_READINGS },
};
