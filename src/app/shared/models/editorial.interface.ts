import { COUNTRY } from '../constants/countries.constant';

export interface Editorial {
  id: number;
  name: string;
  country: COUNTRY;
  website?: string;
  logo?: string;
}
