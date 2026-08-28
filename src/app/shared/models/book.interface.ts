import { LANGUAGE } from '@shared/constants';
import { Editorial } from './editorial.interface';
import { Author } from './author.interface';
import { READING_STATUS } from '../constants/reading-status.constant';

export interface Book {
  id: number;
  title: string;
  author: Author;
  serie?: BookSerie;
  serieVolume?: number;
  editorial: Editorial;
  language: LANGUAGE;
  readingStatus: READING_STATUS;
  cover?: string;
  adquisitionDate?: Date;
  startDate?: Date;
  finishDate?: Date;
  notes?: string;
}

export interface BookSerie {
  id: number;
  title: string;
  editorial: Editorial;
}
