import type { ReadingHeatmap } from '../../../shared/components/reading-heatmap/reading-heatmap';

/** Resumen que expone `ReadingHeatmap` (días con lectura, racha más larga, mes con más páginas…). */
export type HeatmapSummary = NonNullable<ReturnType<ReadingHeatmap['summary']>>;
