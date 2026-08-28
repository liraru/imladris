import { COUNTRY } from '../constants/countries.constant';

export interface Author {
  id: number;
  name: string;
  country: COUNTRY;
  notes?: string;
}
