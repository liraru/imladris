import { Author } from './author.interface';
import { Volume } from './volume.interfate';

export interface Manga {
  id: number;
  title: string;
  authors: Author[];
  demographic: string;
}

export interface MangaVolume extends Volume {
  mangaId: number;
  volumeNumber: number;
}
