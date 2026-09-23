import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  RATING_COLORS,
  RATING_LABELS,
  RATING_SHORT_LABELS,
  READING_STATUS,
  READING_STATUS_LABELS,
} from '@shared/constants';
import { Fanfic } from '@shared/models';
import { AuthService } from '../../../../services/auth.service';
import { MODE } from '../../constants/library.constants';
import { ThousandsPipe } from '../../../../shared/pipes/thousands.pipe';

@Component({
  imports: [
    DatePipe,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    ThousandsPipe,
  ],
  selector: 'app-fanfic-data-display',
  styleUrl: './fanfic-data-display.css',
  templateUrl: './fanfic-data-display.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FanficDataDisplay {
  protected readonly authService = inject(AuthService);

  public mode = input.required<MODE>();
  public data = input.required<Fanfic[]>();

  /** Se emite al clicar sobre la tarjeta/fila de un elemento: abre la ficha de detalle. */
  public readonly viewDetail = output<Fanfic>();
  /** Se emite cuando el usuario elige "Editar" en el menú contextual de un elemento. */
  public readonly editItem = output<Fanfic>();
  public readonly deleteItem = output<Fanfic>();
  public readonly markFinished = output<Fanfic>();

  protected readonly MODE = MODE;
  protected readonly READING_STATUS = READING_STATUS;

  protected readonly displayedColumns = [
    'cover',
    'title',
    'authors',
    'fandom',
    'ship',
    'rating',
    'words',
    'chapters',
    'readingStatus',
    'adquisitionDate',
    'finishDate',
    'actions',
  ];

  protected authorNames(item: Fanfic): string {
    return item.authors.length ? item.authors.join(', ') : 'Autor desconocido';
  }

  protected fandomNames(item: Fanfic): string {
    return item.fandoms.map((f) => f.name).join(', ');
  }

  protected shipLabel(item: Fanfic): string {
    return item.ships.map((s) => s.characters.join(' / ')).join(' · ');
  }

  /** Evita indexar `RATING_LABELS[item.rating]` directamente en la plantilla (falla el checker de Angular). */
  protected ratingLabel(item: Fanfic): string {
    return RATING_LABELS[item.rating];
  }

  /** Código corto (G/T/M/E/NR) mostrado en el badge de rating de la tarjeta de galería. */
  protected ratingShortLabel(item: Fanfic): string {
    return RATING_SHORT_LABELS[item.rating];
  }

  /** Color de acento del badge de rating: verde (audiencia general) → rojo (explícito). */
  protected ratingColor(item: Fanfic): string {
    return RATING_COLORS[item.rating];
  }

  /** Evita indexar `READING_STATUS_LABELS[item.readingStatus]` directamente en la plantilla. */
  protected readingStatusLabel(item: Fanfic): string {
    return READING_STATUS_LABELS[item.readingStatus];
  }
}
