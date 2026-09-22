import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { LANGUAGE_LABELS, READING_STATUS_LABELS } from '@shared/constants';
import { GENRE_LABELS } from '../../../../shared/constants/categories.constant';
import { TYPE, TYPE_LABELS } from '../../constants/library.constants';
import { LibraryItem } from '../../models/library-item.model';

export interface LibraryDetailModalData {
  item: LibraryItem;
  type: TYPE;
}

export interface LibraryDetailModalResult {
  /** `true` si el usuario ha pulsado "Editar": el llamante debe abrir el formulario en modo edición. */
  edit: boolean;
}

@Component({
  selector: 'app-library-detail-modal',
  imports: [DatePipe, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './library-detail-modal.html',
  styleUrl: './library-detail-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryDetailModal {
  private readonly dialogRef = inject(MatDialogRef<LibraryDetailModal, LibraryDetailModalResult>);
  protected readonly data = inject<LibraryDetailModalData>(MAT_DIALOG_DATA);

  protected readonly TYPE = TYPE;
  protected readonly typeLabels = TYPE_LABELS;
  protected readonly languageLabels = LANGUAGE_LABELS;
  protected readonly readingStatusLabels = READING_STATUS_LABELS;
  protected readonly genreLabels = GENRE_LABELS;

  protected readonly item = this.data.item;
  protected readonly isManga = this.data.type === TYPE.MANGA;

  protected get authorNames(): string {
    return this.item.authors.length
      ? this.item.authors.map((a) => a.name).join(', ')
      : 'Autor desconocido';
  }

  protected get genreNames(): string {
    return this.item.genres?.length
      ? this.item.genres.map((g) => this.genreLabels[g]).join(', ')
      : '';
  }

  protected get serieLabel(): string {
    if (!this.item.serieTitle) return '';
    return this.item.serieVolume
      ? `${this.item.serieTitle} #${this.item.serieVolume}`
      : this.item.serieTitle;
  }

  protected close(): void {
    this.dialogRef.close({ edit: false });
  }

  protected edit(): void {
    this.dialogRef.close({ edit: true });
  }
}
