import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LANGUAGE_LABELS } from '@shared/constants';
import { GENRE_LABELS } from '../../../../shared/constants/categories.constant';
import { READING_STATUS_LABELS } from '../../../../shared/constants/reading-status.constant';
import { MODE, TYPE } from '../../constants/library.consants';
import { LibraryItem } from '../../models/library-item.model';

@Component({
  imports: [MatIconModule, MatMenuModule, MatTableModule, MatTooltipModule],
  selector: 'app-library-data-display',
  styleUrl: './library-data-display.css',
  templateUrl: './library-data-display.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryDataDisplay {
  public mode = input.required<MODE>();
  public type = input.required<TYPE>();
  public data = input.required<LibraryItem[]>();

  /** Se emite cuando el usuario elige "Ver detalle" en el menú contextual de un elemento. */
  public readonly viewDetail = output<LibraryItem>();
  /** Se emite cuando el usuario elige "Eliminar" en el menú contextual de un elemento. */
  public readonly deleteItem = output<LibraryItem>();

  protected readonly MODE = MODE;
  protected readonly TYPE = TYPE;
  protected readonly readingStatusLabels = READING_STATUS_LABELS;
  protected readonly languageLabels = LANGUAGE_LABELS;
  protected readonly genreLabels = GENRE_LABELS;

  protected readonly displayedColumns = [
    'cover',
    'title',
    'authors',
    'editorial',
    'serie',
    'genres',
    'readingStatus',
    'releaseDate',
    'adquisitionDate',
    'startDate',
    'finishDate',
    'language',
    'notes',
    'actions',
  ];

  protected authorNames(item: LibraryItem): string {
    return item.authors.length ? item.authors.map((a) => a.name).join(', ') : 'Autor desconocido';
  }

  protected genreNames(item: LibraryItem): string {
    return item.genres?.length ? item.genres.map((g) => this.genreLabels[g]).join(', ') : '—';
  }

  protected serieLabel(item: LibraryItem): string {
    if (!item.serieTitle) return '—';
    return item.serieVolume ? `${item.serieTitle} #${item.serieVolume}` : item.serieTitle;
  }

  protected readingStatusLabel(item: LibraryItem): string {
    return this.readingStatusLabels[item.readingStatus];
  }

  protected languageLabel(item: LibraryItem): string {
    return this.languageLabels[item.language];
  }
}
