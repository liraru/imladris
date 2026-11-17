import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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
import { LIBRARY_TABLE_PAGE_SIZE } from '../../constants/library-table.constants';
import { CoverPreviewDirective } from '../../../../shared/directives/cover-preview.directive';
import { ThousandsPipe } from '../../../../shared/pipes/thousands.pipe';

@Component({
  imports: [
    CoverPreviewDirective,
    DatePipe,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    ThousandsPipe,
  ],
  selector: 'app-fanfic-data-display',
  styleUrls: ['../library-table-shared.css', './fanfic-data-display.css'],
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
  /** Se emite cuando el usuario elige marcar/desmarcar como favorito en el menú contextual. */
  public readonly toggleFavorite = output<Fanfic>();

  protected readonly MODE = MODE;
  protected readonly READING_STATUS = READING_STATUS;

  protected readonly displayedColumns = [
    'cover',
    'favorite',
    'title',
    'authors',
    'fandom',
    'ship',
    'rating',
    'words',
    'chapters',
    'readingStatus',
    'timesRead',
    'adquisitionDate',
    'finishDate',
    'actions',
  ];

  // ---------- Paginación (en front, solo vista tabla) ----------

  protected readonly pageSize = LIBRARY_TABLE_PAGE_SIZE;
  protected readonly pageIndex = signal(0);

  private readonly tableWrapper = viewChild<ElementRef<HTMLElement>>('tableWrapper');

  protected readonly totalItems = computed(() => this.data().length);

  /** El control de paginación solo se muestra si hay más registros de los que caben en una página. */
  protected readonly showPaginator = computed(() => this.totalItems() > this.pageSize);

  /** Ajusta el índice si el filtrado deja menos páginas de las que había. */
  protected readonly clampedPageIndex = computed(() => {
    const maxIndex = Math.max(0, Math.ceil(this.totalItems() / this.pageSize) - 1);
    return Math.min(this.pageIndex(), maxIndex);
  });

  protected readonly pagedData = computed(() => {
    const start = this.clampedPageIndex() * this.pageSize;
    return this.data().slice(start, start + this.pageSize);
  });

  /** Vuelve a la primera página cuando cambia el nº de resultados (filtros). */
  private readonly _resetPageOnChange = effect(() => {
    void this.totalItems();
    untracked(() => this.pageIndex.set(0));
  });

  protected onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.tableWrapper()?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

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
