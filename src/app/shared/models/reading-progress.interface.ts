export interface ReadingProgress {
  id: number;
  readingId: number;
  recordDate: string; // yyyy-MM-dd
  page: number;
  percentage: number; // 0-100, con hasta 2 decimales
  pagesAdvanced: number; // avance en páginas respecto al registro anterior de la misma lectura
}
