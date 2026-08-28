import { LANGUAGE } from '@shared/constants';
import { Editorial } from './editorial.interface';
import { Author } from './author.interface';
import { READING_STATUS } from '../constants/reading-status.constant';
import { Volume } from './volume.interfate';

export interface Book extends Volume {
  serie?: BookSerie;
  serieVolume?: number;
}

export interface BookSerie {
  id: number;
  title: string;
  editorial: Editorial;
}
