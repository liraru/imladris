export enum MODE {
  GALLERY = 1,
  TABLE,
}

export const MODE_LABELS: Record<MODE, string> = {
  [MODE.GALLERY]: 'Galería',
  [MODE.TABLE]: 'Tabla',
};

export enum TYPE {
  BOOK = 1,
  MANGA,
}

export const TYPE_LABELS: Record<TYPE, string> = {
  [TYPE.BOOK]: 'Novelas',
  [TYPE.MANGA]: 'Manga',
};

export enum SORT_FIELD {
  TITLE = 'title',
  AUTHOR = 'author',
  SERIE = 'serie',
  VOLUME_NUMBER = 'volumeNumber',
  FINISH_DATE = 'finishDate',
  ADQUISITION_DATE = 'adquisitionDate',
  RELEASE_DATE = 'releaseDate',
  NOTES = 'notes',
}

export const SORT_FIELD_LABELS: Record<SORT_FIELD, string> = {
  [SORT_FIELD.TITLE]: 'Título',
  [SORT_FIELD.AUTHOR]: 'Autor',
  [SORT_FIELD.SERIE]: 'Serie',
  [SORT_FIELD.VOLUME_NUMBER]: 'Número de volumen',
  [SORT_FIELD.FINISH_DATE]: 'Fecha de finalización',
  [SORT_FIELD.ADQUISITION_DATE]: 'Fecha de adquisición',
  [SORT_FIELD.RELEASE_DATE]: 'Fecha de publicación',
  [SORT_FIELD.NOTES]: 'Notas',
};

/** Orden por defecto: distinto según se esté viendo la colección de novelas o de manga. */
export const DEFAULT_SORT_BY: Record<TYPE, SORT_FIELD[]> = {
  [TYPE.BOOK]: [SORT_FIELD.SERIE, SORT_FIELD.VOLUME_NUMBER, SORT_FIELD.TITLE],
  [TYPE.MANGA]: [SORT_FIELD.TITLE, SORT_FIELD.VOLUME_NUMBER, SORT_FIELD.NOTES],
};

export const DEFAULT_SORT_DIRECTION: 'asc' | 'desc' = 'asc';
