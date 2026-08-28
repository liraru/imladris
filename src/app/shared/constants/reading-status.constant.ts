export enum READING_STATUS {
  NOT_STARTED = 'not_started',
  READING = 'reading',
  FINISHED = 'finished',
  ABANDONED = 'abandoned',
}

export const READING_STATUS_LABELS: Record<READING_STATUS, string> = {
  [READING_STATUS.NOT_STARTED]: 'No empezado',
  [READING_STATUS.READING]: 'Leyendo',
  [READING_STATUS.FINISHED]: 'Finalizado',
  [READING_STATUS.ABANDONED]: 'Abandonado'
};