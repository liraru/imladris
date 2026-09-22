import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { LANGUAGE_LABELS, RATING_LABELS, READING_STATUS_LABELS } from '@shared/constants';
import { Fanfic } from '@shared/models';
import { ThousandsPipe } from '../../../../shared/pipes/thousands.pipe';

export interface FanficDetailModalData {
  item: Fanfic;
}

export interface FanficDetailModalResult {
  /** `true` si el usuario ha pulsado "Editar": el llamante debe abrir el formulario en modo edición. */
  edit: boolean;
}

@Component({
  selector: 'app-fanfic-detail-modal',
  imports: [DatePipe, MatButtonModule, MatDialogModule, MatIconModule, ThousandsPipe],
  templateUrl: './fanfic-detail-modal.html',
  styleUrl: './fanfic-detail-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FanficDetailModal {
  private readonly dialogRef = inject(MatDialogRef<FanficDetailModal, FanficDetailModalResult>);
  protected readonly data = inject<FanficDetailModalData>(MAT_DIALOG_DATA);

  protected readonly languageLabels = LANGUAGE_LABELS;
  protected readonly readingStatusLabels = READING_STATUS_LABELS;
  protected readonly ratingLabels = RATING_LABELS;

  protected readonly item = this.data.item;

  protected get authorNames(): string {
    return this.item.authors.length ? this.item.authors.join(', ') : 'Autor desconocido';
  }

  protected get fandomNames(): string {
    return this.item.fandoms.map((f) => f.name).join(', ');
  }

  protected get shipLabel(): string {
    return this.item.ships.map((s) => s.characters.join(' / ')).join(' · ');
  }

  protected close(): void {
    this.dialogRef.close({ edit: false });
  }

  protected edit(): void {
    this.dialogRef.close({ edit: true });
  }
}
