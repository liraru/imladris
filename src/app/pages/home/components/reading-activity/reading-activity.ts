import { ChangeDetectionStrategy, Component, computed, input, viewChild } from '@angular/core';
import { ReadingHeatmap } from '../../../../shared/components/reading-heatmap/reading-heatmap';

@Component({
  selector: 'app-reading-activity',
  imports: [ReadingHeatmap],
  templateUrl: './reading-activity.html',
  styleUrl: './reading-activity.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // El propio host es el panel (clase global definida en _home-shared.scss).
  host: { class: 'home__panel' },
})
export class ReadingActivity {
  /** true por debajo de 768px (lo decide Home). */
  readonly isMobile = input(false);

  private readonly _heatmap = viewChild(ReadingHeatmap);

  /**
   * Resumen del mapa de calor. Home se lo pasa a "En cifras", que en móvil muestra ahí las
   * cifras que en escritorio van bajo el mapa.
   */
  readonly summary = computed(() => this._heatmap()?.summary() ?? null);
}
