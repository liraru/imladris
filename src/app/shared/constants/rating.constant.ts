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
