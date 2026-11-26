import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ROUTES } from '@shared/constants';
import { YearlyReading } from '@shared/models';
import { HOME_ITEM_TYPE, HomeItem } from '../../models/home-item.model';

/**
 * Normaliza un título para compararlo entre la biblioteca y las lecturas anuales: sin tildes,
 * en minúsculas y sin espacios ni signos ("Atelier of Witch Hat: Ed. Grimorio vol.4" y
 * "Atelier of Witch Hat - Ed. Grimorio - Vol. 4" dan el mismo resultado).
 */
function normalizeTitle(title: string): string {
  const normalized = title
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '');
  return normalized || title.trim().toLowerCase();
}

@Component({
  selector: 'app-last-additions',
  imports: [RouterLink, DatePipe, MatIconModule, MatTooltipModule],
  templateUrl: './last-additions.html',
  styleUrl: './last-additions.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastAdditions {
  protected readonly ROUTES = ROUTES;
  protected readonly HOME_ITEM_TYPE = HOME_ITEM_TYPE;

  /** Libros y tomos de manga de la biblioteca. */
  readonly additions = input<HomeItem[]>([]);
  /** Lecturas finalizadas, para marcar como "Leído" las incorporaciones. */
  readonly finishedReadings = input<YearlyReading[]>([]);
  /** Nº máximo de entradas a mostrar (depende del breakpoint). */
  readonly limit = input.required<number>();

  /** Las últimas incorporaciones a la biblioteca (libros y tomos de manga), más reciente primero. */
  protected readonly lastAdditions = computed(() =>
    [...this.additions()]
      .filter((item) => !!item.adquisitionDate)
      .sort((a, b) => (b.adquisitionDate ?? '').localeCompare(a.adquisitionDate ?? ''))
      .slice(0, this.limit()),
  );

  /** Títulos normalizados de las lecturas finalizadas. */
  private readonly _readTitles = computed(
    () => new Set(this.finishedReadings().map((r) => normalizeTitle(r.title))),
  );

  protected authorNames(item: HomeItem): string {
    return item.authors.length ? item.authors.map((a) => a.name).join(', ') : 'Autor desconocido';
  }

  /**
   * Indica si la incorporación ya se ha leído. Se cruza por título normalizado con las
   * lecturas finalizadas de Lecturas anuales.
   */
  protected isRead(item: HomeItem): boolean {
    return this._readTitles().has(normalizeTitle(item.title));
  }
}
