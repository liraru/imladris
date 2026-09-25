import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';

import { ReadingProgress, YearlyReading } from '@shared/models';
import { ReadingProgressService } from '../../../../services/reading-progress.service';
import { ThousandsPipe } from '../../../../shared/pipes/thousands.pipe';
import {
  ReadingProgressFormModal,
  ReadingProgressFormModalData,
} from '../../../../shared/components/reading-progress-form-modal/reading-progress-form-modal';
import { AuthService } from '../../../../services/auth.service';

export interface ReadingDetailModalData {
  reading: YearlyReading;
}

@Component({
  selector: 'app-reading-detail-modal',
  imports: [
    DatePipe,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ThousandsPipe,
  ],
  templateUrl: './reading-detail-modal.html',
  styleUrl: './reading-detail-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingDetailModal implements OnInit {
  private readonly _dialogRef = inject(MatDialogRef<ReadingDetailModal>);
  private readonly _dialog = inject(MatDialog);
  private readonly _service = inject(ReadingProgressService);
  protected readonly authService = inject(AuthService);
  protected readonly data = inject<ReadingDetailModalData>(MAT_DIALOG_DATA);

  protected readonly reading = this.data.reading;
  protected readonly records = signal<ReadingProgress[]>([]);
  protected readonly loading = signal(true);

  async ngOnInit(): Promise<void> {
    await this._loadRecords();
  }

  protected close(): void {
    this._dialogRef.close();
  }

  protected async registerProgress(): Promise<void> {
    const ref = this._dialog.open(ReadingProgressFormModal, {
      width: '480px',
      disableClose: true,
      data: { reading: this.reading } satisfies ReadingProgressFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this._loadRecords();
  }

  protected async editRecord(record: ReadingProgress): Promise<void> {
    const ref = this._dialog.open(ReadingProgressFormModal, {
      width: '480px',
      disableClose: true,
      data: { reading: this.reading, progress: record } satisfies ReadingProgressFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this._loadRecords();
  }

  protected async deleteRecord(record: ReadingProgress, event: Event): Promise<void> {
    event.stopPropagation();
    if (!confirm('¿Eliminar este registro de avance?')) return;
    await this._service.remove(record.id);
    await this._loadRecords();
  }

  private async _loadRecords(): Promise<void> {
    this.loading.set(true);
    this.records.set(await this._service.getByReadingId(this.reading.id));
    this.loading.set(false);
  }
}
