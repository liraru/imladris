import { CodeLabel } from '../models/code-label.model';

export enum COUNTRY {
  SPAIN = 'ES',
  ENGLAND = 'GB',
  USA = 'US',
  JAPAN = 'JP',
}

export const COUNTRY_LABELS: Record<COUNTRY, string> = {
  [COUNTRY.SPAIN]: 'España',
  [COUNTRY.ENGLAND]: 'Inglaterra',
  [COUNTRY.USA]: 'Estados Unidos',
  [COUNTRY.JAPAN]: 'Japón',
};
