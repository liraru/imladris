import { LANGUAGE } from '@shared/constants';
import { Author, Book, Editorial, MangaVolume } from '@shared/models';
import { GENRE } from '../../../shared/constants/categories.constant';
import { READING_STATUS } from '../../../shared/constants/reading-status.constant';

export interface LibraryItem {
  id: number;
  title: string;
  authors: Author[];
  readingStatus: READING_STATUS;
  releaseDate?: string;
  coverImageUrl?: string;
  adquisitionDate?: string;
  startDate?: string;
  finishDate?: string;
  notes?: string;
  language: LANGUAGE;
  editorial: Editorial;
  serieId?: number;
  serieTitle?: string;
  serieVolume?: number;
  genres?: GENRE[];
}

export function fromBook(book: Book): LibraryItem {
  return {
    id: book.id,
    title: book.title,
    authors: book.authors,
    readingStatus: book.readingStatus,
    releaseDate: book.releaseDate,
    coverImageUrl: book.coverImageUrl,
    adquisitionDate: book.adquisitionDate,
    startDate: book.startDate,
    finishDate: book.finishDate,
    notes: book.notes,
    language: book.language,
    editorial: book.editorial,
    serieId: book.serie?.id,
    serieTitle: book.serie?.title,
    serieVolume: book.serieVolume,
    genres: book.genres,
  };
}

/**
 * `mangaTitle` es el nombre del manga (la "serie" a la que pertenece el tomo), no el título del
 * propio tomo. Se recibe aparte porque `MangaVolume` solo trae el `mangaId`; quien llama a esta
 * función es responsable de resolverlo (ver `Library._loadItems`).
 */
export function fromMangaVolume(volume: MangaVolume, mangaTitle?: string): LibraryItem {
  return {
    id: volume.id,
    title: volume.title,
    authors: volume.authors,
    readingStatus: volume.readingStatus,
    releaseDate: volume.releaseDate,
    coverImageUrl: volume.coverImageUrl,
    adquisitionDate: volume.adquisitionDate,
    startDate: volume.startDate,
    finishDate: volume.finishDate,
    notes: volume.notes,
    language: volume.language,
    editorial: volume.editorial,
    serieId: volume.mangaId,
    serieTitle: mangaTitle,
    serieVolume: volume.volumeNumber,
  };
}
