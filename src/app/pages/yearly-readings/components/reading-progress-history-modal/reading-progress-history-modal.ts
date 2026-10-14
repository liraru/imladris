import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
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
import { AuthService } from '../../../../services/auth.service';
import { ReadingProgressService } from '../../../../services/reading-progress.service';
import { YearlyReadingService } from '../../../../services/yearly-reading.service';
import { ThousandsPipe } from '../../../../shared/pipes/thousands.pipe';
import {
  ReadingProgressFormModal,
  ReadingProgressFormModalData,
} from '../../../../shared/components/reading-progress-form-modal/reading-progress-form-modal';

export interface ReadingProgressHistoryModalData {
  reading: YearlyReading;
}

type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-reading-progress-history-modal',
  imports: [
    DatePipe,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ThousandsPipe,
  ],
  templateUrl: './reading-progress-history-modal.html',
  styleUrl: './reading-progress-history-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingProgressHistoryModal implements OnInit {
  private readonly _dialogRef = inject(MatDialogRef<ReadingProgressHistoryModal>);
  private readonly _dialog = inject(MatDialog);
  private readonly _service = inject(ReadingProgressService);
  private readonly _yearlyReadingSrv = inject(YearlyReadingService);
  protected readonly data = inject<ReadingProgressHistoryModalData>(MAT_DIALOG_DATA);

  protected readonly authService = inject(AuthService);

  /** Signal (y no una constante) porque la lectura puede pasar a finalizada mientras la modal está abierta. */
  protected readonly reading = signal<YearlyReading>(this.data.reading);
  protected readonly records = signal<ReadingProgress[]>([]);
  protected readonly loading = signal(true);

  /**
   * Orden de la columna Fecha. Lectura sin finalizar: de más reciente a más antigua ('desc').
   * Lectura finalizada: cronológico ('asc'). Se invierte pulsando la cabecera.
   */
  protected readonly sortDirection = signal<SortDirection>(
    this.data.reading.endDate ? 'asc' : 'desc',
  );

  /** Registros ordenados por fecha; a igualdad de fecha, por página y por id para un orden estable. */
  protected readonly sortedRecords = computed(() => {
    const factor = this.sortDirection() === 'asc' ? 1 : -1;
    return [...this.records()].sort(
      (a, b) =>
        factor *
        (a.recordDate.localeCompare(b.recordDate) ||
          Number(a.page) - Number(b.page) ||
          Number(a.id) - Number(b.id)),
    );
  });

  /** Texto del tooltip de la cabecera: describe el orden al que se pasará al pulsarla. */
  protected readonly sortTooltip = computed(() =>
    this.sortDirection() === 'desc'
      ? 'Ordenar de más antigua a más reciente'
      : 'Ordenar de más reciente a más antigua',
  );

  /** Registrar, editar y eliminar avances: solo admin y solo mientras la lectura no esté finalizada. */
  protected readonly canWrite = computed(
    () => this.authService.isAdmin() && !this.reading().endDate,
  );

  async ngOnInit(): Promise<void> {
    await this._loadRecords();
  }

  protected close(): void {
    this._dialogRef.close();
  }

  protected toggleSort(): void {
    this.sortDirection.update((dir) => (dir === 'desc' ? 'asc' : 'desc'));
  }

  protected async registerProgress(): Promise<void> {
    if (!this.canWrite()) return;

    const ref = this._dialog.open(ReadingProgressFormModal, {
      width: '480px',
      disableClose: true,
      data: { reading: this.reading() } satisfies ReadingProgressFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) {
      await this._refreshReading();
      await this._loadRecords();
    }
  }

  protected async editRecord(record: ReadingProgress): Promise<void> {
    if (!this.canWrite()) return;

    const ref = this._dialog.open(ReadingProgressFormModal, {
      width: '480px',
      disableClose: true,
      data: { reading: this.reading(), progress: record } satisfies ReadingProgressFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) {
      await this._refreshReading();
      await this._loadRecords();
    }
  }

  protected async deleteRecord(record: ReadingProgress): Promise<void> {
    if (!this.canWrite()) return;
    if (!confirm('¿Eliminar este registro de avance?')) return;
    await this._service.remove(record.id);
    await this._loadRecords();
  }

  /** Recarga la lectura: al marcarla como completada desde el formulario de avance cambia su fecha de fin. */
  private async _refreshReading(): Promise<void> {
    try {
      const all = await this._yearlyReadingSrv.getAll();
      const updated = all.find((r) => r.id === this.reading().id);
      if (updated) this.reading.set(updated);
    } catch (err) {
      console.error(err);
    }
  }

  private async _loadRecords(): Promise<void> {
    this.loading.set(true);
    this.records.set(await this._service.getByReadingId(this.reading().id));
    this.loading.set(false);
  }
}
