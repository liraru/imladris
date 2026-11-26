import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ROUTES } from '@shared/constants';
import { YearlyReading } from '@shared/models';

@Component({
  selector: 'app-last-readings',
  imports: [RouterLink, DatePipe, MatIconModule, MatTooltipModule],
  templateUrl: './last-readings.html',
  styleUrl: './last-readings.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastReadings {
  protected readonly ROUTES = ROUTES;

  /** Lecturas finalizadas, la más reciente primero. */
  readonly readings = input<YearlyReading[]>([]);
  /** Nº máximo de entradas a mostrar (depende del breakpoint). */
  readonly limit = input.required<number>();

  /** Últimas lecturas finalizadas, recortadas al nº de entradas del breakpoint actual. */
  protected readonly lastReadingsToShow = computed(() => this.readings().slice(0, this.limit()));
}
