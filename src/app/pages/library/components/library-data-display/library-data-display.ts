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
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GENRE_LABELS } from '../../../../shared/constants/categories.constant';
import {
  READING_STATUS,
  READING_STATUS_LABELS,
} from '../../../../shared/constants/reading-status.constant';
import { CoverPreviewDirective } from '../../../../shared/directives/cover-preview.directive';
import { AuthService } from '../../../../services/auth.service';
import { MODE, TYPE } from '../../constants/library.constants';
import { LIBRARY_TABLE_PAGE_SIZE } from '../../constants/library-table.constants';
import { LibraryItem } from '../../models/library-item.model';
import { MatDivider } from '@angular/material/divider';

/** Columnas de la vista tabla de novelas. */
const BOOK_COLUMNS = [
  'cover',
  'favorite',
  'title',
  'authors',
  'editorial',
  'serie',
  'readingStatus',
  'timesRead',
  'actions',
];

/** Columnas de la vista tabla de tomos de manga (la columna `serie` muestra solo el nº de tomo). */
const MANGA_COLUMNS = [
  'cover',
  'favorite',
  'title',
  'authors',
  'editorial',
  'serie',
  'genres',
  'readingStatus',
  'timesRead',
  'actions',
];

@Component({
  imports: [
    CoverPreviewDirective,
    DatePipe,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatDivider,
  ],
  selector: 'app-library-data-display',
  styleUrls: ['../library-table-shared.css', './library-data-display.css'],
  templateUrl: './library-data-display.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryDataDisplay {
  protected readonly authService = inject(AuthService);

  public mode = input.required<MODE>();
  public type = input.required<TYPE>();
  public data = input.required<LibraryItem[]>();

  /** Se emite al clicar sobre la tarjeta/fila de un elemento: abre la ficha de detalle. */
  public readonly viewDetail = output<LibraryItem>();
  /** Se emite cuando el usuario elige "Editar" en el menú contextual de un elemento. */
  public readonly editItem = output<LibraryItem>();
  /** Se emite cuando el usuario elige "Eliminar" en el menú contextual de un elemento. */
  public readonly deleteItem = output<LibraryItem>();
  public readonly markFinished = output<LibraryItem>();
  /** Se emite cuando el usuario elige marcar/desmarcar como favorito en el menú contextual. */
  public readonly toggleFavorite = output<LibraryItem>();

  protected readonly MODE = MODE;
  protected readonly TYPE = TYPE;
  protected readonly READING_STATUS = READING_STATUS;
  protected readonly readingStatusLabels = READING_STATUS_LABELS;
  protected readonly genreLabels = GENRE_LABELS;

  protected readonly displayedColumns = computed(() =>
    this.type() === TYPE.MANGA ? MANGA_COLUMNS : BOOK_COLUMNS,
  );

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

  /** Vuelve a la primera página cuando cambia el nº de resultados (filtros) o el tipo (novelas/manga). */
  private readonly _resetPageOnChange = effect(() => {
    void this.totalItems();
    void this.type();
    untracked(() => this.pageIndex.set(0));
  });

  protected onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.tableWrapper()?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected authorNames(item: LibraryItem): string {
    return item.authors.length ? item.authors.map((a) => a.name).join(', ') : 'Autor desconocido';
  }

  protected genreNames(item: LibraryItem): string {
    return item.genres?.length ? item.genres.map((g) => this.genreLabels[g]).join(', ') : '—';
  }

  /** Manga: solo el nº de tomo. Novelas: "Serie #vol". */
  protected serieLabel(item: LibraryItem): string {
    if (this.type() === TYPE.MANGA) {
      return item.serieVolume != null ? String(item.serieVolume) : '—';
    }
    if (!item.serieTitle) return '—';
    return item.serieVolume ? `${item.serieTitle} #${item.serieVolume}` : item.serieTitle;
  }

  protected readingStatusLabel(item: LibraryItem): string {
    return this.readingStatusLabels[item.readingStatus];
  }
}
