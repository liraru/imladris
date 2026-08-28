import { GENRE } from '../constants/categories.constant';
import { Editorial } from './editorial.interface';
import { Volume } from './volume.interface';

export interface Book extends Volume {
  serie?: BookSerie;
  serieVolume?: number;
  genres: GENRE[];
}

export interface BookSerie {
  id: number;
  title: string;
  editorial: Editorial;
}
