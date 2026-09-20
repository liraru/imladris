import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RATING_LABELS, READING_STATUS, READING_STATUS_LABELS } from '@shared/constants';
import { Fanfic } from '@shared/models';
import { AuthService } from '../../../../services/auth.service';
import { MODE } from '../../constants/library.constants';

@Component({
  imports: [DatePipe, MatIconModule, MatMenuModule, MatTableModule, MatTooltipModule],
  selector: 'app-fanfic-data-display',
  styleUrl: './fanfic-data-display.css',
  templateUrl: './fanfic-data-display.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FanficDataDisplay {
  protected readonly authService = inject(AuthService);

  public mode = input.required<MODE>();
  public data = input.required<Fanfic[]>();

  public readonly viewDetail = output<Fanfic>();
  public readonly deleteItem = output<Fanfic>();
  public readonly markFinished = output<Fanfic>();

  protected readonly MODE = MODE;
  protected readonly READING_STATUS = READING_STATUS;
  protected readonly readingStatusLabels = READING_STATUS_LABELS;
  protected readonly ratingLabels = RATING_LABELS;

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

  protected shipLabel(item: Fanfic): string {
    return item.ship.characters.join(' / ');
  }
}
