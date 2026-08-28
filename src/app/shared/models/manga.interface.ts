import { Author } from './author.interface';

export interface Manga {
  id: number;
  title: string;
  authors: Author[];
  demographic: string;
}

export interface MangaVolume {
  id: number;
  mangaId: number;
  volumeNumber: number;
  title: string;
  releaseDate: Date;
  coverImageUrl: string;
}
