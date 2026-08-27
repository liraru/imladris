import { EDITORIAL, LANGUAGE } from '../shared/constants';

export interface Book {
  title: string;
  author: string;
  serie: string;
  serieVolume: number;
  editorial: EDITORIAL;
  language: LANGUAGE;
  cover?: string;
}
