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
  FINISH_DATE = 'finishDate',
  ADQUISITION_DATE = 'adquisitionDate',
  RELEASE_DATE = 'releaseDate',
}

export const SORT_FIELD_LABELS: Record<SORT_FIELD, string> = {
  [SORT_FIELD.TITLE]: 'Título',
  [SORT_FIELD.AUTHOR]: 'Autor',
  [SORT_FIELD.FINISH_DATE]: 'Fecha de finalización',
  [SORT_FIELD.ADQUISITION_DATE]: 'Fecha de adquisición',
  [SORT_FIELD.RELEASE_DATE]: 'Fecha de publicación',
};