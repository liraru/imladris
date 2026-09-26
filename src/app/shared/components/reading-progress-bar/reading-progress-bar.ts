import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-reading-progress-bar',
  imports: [],
  templateUrl: './reading-progress-bar.html',
  styleUrl: './reading-progress-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingProgressBar {
  /** Porcentaje de avance, 0-100. Se acota al rango antes de pintar la barra. */
  readonly percentage = input.required<number>();

  protected get clamped(): number {
    return Math.min(100, Math.max(0, this.percentage()));
  }
}
