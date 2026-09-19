import { Author, Book, MangaVolume } from '@shared/models';

export enum HOME_ITEM_TYPE {
  BOOK = 1,
  MANGA,
}

/**
 * Representación mínima de un libro o tomo de manga para "Últimas incorporaciones".
 * No reutiliza `LibraryItem` (propio de la sección Biblioteca) para no acoplar features entre sí.
 */
export interface HomeItem {
  id: number;
  type: HOME_ITEM_TYPE;
  title: string;
  authors: Author[];
  coverImageUrl?: string;
  adquisitionDate?: string;
}

export function fromBook(book: Book): HomeItem {
  return {
    id: book.id,
    type: HOME_ITEM_TYPE.BOOK,
    title: book.title,
    authors: book.authors,
    coverImageUrl: book.coverImageUrl,
    adquisitionDate: book.adquisitionDate,
  };
}

export function fromMangaVolume(volume: MangaVolume): HomeItem {
  return {
    id: volume.id,
    type: HOME_ITEM_TYPE.MANGA,
    title:
      volume.volumeNumber != null
        ? `${volume.title} vol.${volume.volumeNumber}`
        : volume.notes
          ? `${volume.title} - ${volume.notes}`
          : volume.title,
    authors: volume.authors,
    coverImageUrl: volume.coverImageUrl,
    adquisitionDate: volume.adquisitionDate,
  };
}
