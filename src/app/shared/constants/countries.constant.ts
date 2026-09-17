import { CodeLabel } from '../models/code-label.model';

export enum COUNTRY {
  SPAIN = 'ES',
  ENGLAND = 'GB',
  USA = 'US',
  JAPAN = 'JP',
  FRANCE = 'FR',
  GERMANY = 'DE',
  CHINA = 'CN',
  SOUTH_KOREA = 'KR',
  RUSSIA = 'RU',
}

export const COUNTRY_LABELS: Record<COUNTRY, string> = {
  [COUNTRY.SPAIN]: 'España',
  [COUNTRY.ENGLAND]: 'Inglaterra',
  [COUNTRY.USA]: 'Estados Unidos',
  [COUNTRY.JAPAN]: 'Japón',
  [COUNTRY.FRANCE]: 'Francia',
  [COUNTRY.GERMANY]: 'Alemania',
  [COUNTRY.CHINA]: 'China',
  [COUNTRY.SOUTH_KOREA]: 'Corea del Sur',
  [COUNTRY.RUSSIA]: 'Rusia',
};
