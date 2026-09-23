export enum RATING {
  NR = 'Not Rated',
  G = 'General Audiences',
  T = 'Teen and Up Audiences',
  M = 'Mature',
  E = 'Explicit',
}

export const RATING_LABELS: Record<RATING, string> = {
  [RATING.NR]: 'Sin clasificar',
  [RATING.G]: 'Audiencia general',
  [RATING.T]: 'Adolescentes y adultos',
  [RATING.M]: 'Maduro',
  [RATING.E]: 'Explícito',
};

/** Código corto (estilo AO3) usado en los badges de rating, donde el espacio es limitado. */
export const RATING_SHORT_LABELS: Record<RATING, string> = {
  [RATING.NR]: 'NR',
  [RATING.G]: 'G',
  [RATING.T]: 'T',
  [RATING.M]: 'M',
  [RATING.E]: 'E',
};

/**
 * Color de acento por rating, de verde (audiencia general) a rojo/vino (explícito),
 * pasando por ámbar y naranja quemado. "Sin clasificar" queda fuera de la escala,
 * en un gris neutro. Tonos desaturados a juego con la paleta "nocturnal library".
 */
export const RATING_COLORS: Record<RATING, string> = {
  [RATING.NR]: '#6b6f78',
  [RATING.G]: '#5c8a63',
  [RATING.T]: '#a08a4a',
  [RATING.M]: '#b86f45',
  [RATING.E]: '#9c4a4a',
};
