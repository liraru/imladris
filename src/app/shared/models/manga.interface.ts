import { DEMOGRAPHIC, GENRE } from '../constants/categories.constant';
import { Author } from './author.interface';
import { Volume } from './volume.interface';

export interface Manga {
  id: number;
  title: string;
  authors: Author[];
  demographic: DEMOGRAPHIC;
  genres: GENRE[];
}

export interface MangaVolume extends Volume {
  mangaId: number;
  volumeNumber: number;
}
