import { LANGUAGE } from '@shared/constants';
import { Author, Book, MangaVolume } from '@shared/models';

export enum HOME_ITEM_TYPE {
  BOOK = 1,
  MANGA,
}

/**
 * Representación mínima y común de un libro o tomo de manga para la pantalla de inicio.
 * No reutiliza `LibraryItem` (propio de la sección Biblioteca) para no acoplar features entre sí.
 */
export interface HomeItem {
  id: number;
  type: HOME_ITEM_TYPE;
  title: string;
  authors: Author[];
  coverImageUrl?: string;
  adquisitionDate?: string;
  finishDate?: string;
  serieTitle?: string;
  serieVolume?: number;
  language: LANGUAGE;
}

export function fromBook(book: Book): HomeItem {
  return {
    id: book.id,
    type: HOME_ITEM_TYPE.BOOK,
    title: book.title,
    authors: book.authors,
    coverImageUrl: book.coverImageUrl,
    adquisitionDate: book.adquisitionDate,
    finishDate: book.finishDate,
    serieTitle: book.serie?.title,
    serieVolume: book.serieVolume,
    language: book.language,
  };
}

/**
 * `mangaTitle` es el nombre del manga (la serie a la que pertenece el tomo); `MangaVolume` solo
 * trae el `mangaId`, así que quien llama a esta función es responsable de resolverlo.
 */
export function fromMangaVolume(volume: MangaVolume, mangaTitle?: string): HomeItem {
  return {
    id: volume.id,
    type: HOME_ITEM_TYPE.MANGA,
    title: volume.title,
    authors: volume.authors,
    coverImageUrl: volume.coverImageUrl,
    adquisitionDate: volume.adquisitionDate,
    finishDate: volume.finishDate,
    serieTitle: mangaTitle,
    serieVolume: volume.volumeNumber,
    language: volume.language,
  };
}
