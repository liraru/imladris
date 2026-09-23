export enum FANFIC_SORT_FIELD {
  TITLE = 'title',
  AUTHOR = 'author',
  FANDOM = 'fandom',
  SHIP = 'ship',
  RATING = 'rating',
  WORDS = 'words',
  CHAPTERS = 'chapters',
  FINISH_DATE = 'finishDate',
  ADQUISITION_DATE = 'adquisitionDate',
}

export const FANFIC_SORT_FIELD_LABELS: Record<FANFIC_SORT_FIELD, string> = {
  [FANFIC_SORT_FIELD.TITLE]: 'Título',
  [FANFIC_SORT_FIELD.AUTHOR]: 'Autor',
  [FANFIC_SORT_FIELD.FANDOM]: 'Fandom',
  [FANFIC_SORT_FIELD.SHIP]: 'Ship',
  [FANFIC_SORT_FIELD.RATING]: 'Rating',
  [FANFIC_SORT_FIELD.WORDS]: 'Palabras',
  [FANFIC_SORT_FIELD.CHAPTERS]: 'Capítulos',
  [FANFIC_SORT_FIELD.FINISH_DATE]: 'Fecha de finalización',
  [FANFIC_SORT_FIELD.ADQUISITION_DATE]: 'Fecha de adquisición',
};

/**
 * Orden por defecto del listado: alfabético por fandom y, a igualdad de fandom, por título
 * (el desempate por título se aplica en el comparador de `fanfic-section.ts`, no aquí).
 */
export const DEFAULT_FANFIC_SORT: FANFIC_SORT_FIELD = FANFIC_SORT_FIELD.FANDOM;
export const DEFAULT_FANFIC_SORT_DIRECTION: 'asc' | 'desc' = 'asc';
