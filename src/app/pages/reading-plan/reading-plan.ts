import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import {
  ReadingPlanFormModal,
  ReadingPlanFormModalData,
} from './components/reading-plan-form-modal/reading-plan-form-modal';
import {
  SendToYearlyReadingModal,
  SendToYearlyReadingModalData,
} from './components/send-to-yearly-reading-modal/send-to-yearly-reading-modal';
import { ReadingPlanService } from '../../services/reading-plan.service';
import { ReadingPlanItem } from '@shared/models';

@Component({
  imports: [
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  selector: 'app-reading-plan',
  styleUrl: './reading-plan.css',
  templateUrl: './reading-plan.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingPlan implements OnInit {
  private readonly _service = inject(ReadingPlanService);
  private readonly _dialog = inject(MatDialog);

  protected readonly items = signal<ReadingPlanItem[]>([]);
  protected readonly loading = signal<boolean>(true);
  protected readonly reordering = signal<boolean>(false);
  protected readonly error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      this.items.set(await this._service.getAll());
    } catch (err) {
      this.error.set('No se pudo cargar el plan de lectura. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Reordena localmente al soltar y persiste solo el tramo afectado (entre la posición
   * de origen y la de destino), no el listado completo.
   */
  protected drop(event: CdkDragDrop<ReadingPlanItem[]>): void {
    if (event.previousIndex === event.currentIndex) return;

    const items = [...this.items()];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.items.set(items);

    const start = Math.min(event.previousIndex, event.currentIndex);
    const end = Math.max(event.previousIndex, event.currentIndex);
    const updates = items
      .slice(start, end + 1)
      .map((item, i) => ({ id: item.id, order: start + i }));

    this.reordering.set(true);
    this._service
      .reorder(updates)
      .catch((err) => {
        this.error.set(
          'No se ha podido guardar el nuevo orden. Recarga la página e inténtalo de nuevo.',
        );
        console.error(err);
      })
      .finally(() => this.reordering.set(false));
  }

  protected async openCreateModal(): Promise<void> {
    const ref = this._dialog.open(ReadingPlanFormModal, {
      width: '480px',
      maxWidth: '95vw',
      data: { nextOrder: this.items().length } satisfies ReadingPlanFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async openEditModal(item: ReadingPlanItem): Promise<void> {
    const ref = this._dialog.open(ReadingPlanFormModal, {
      width: '480px',
      maxWidth: '95vw',
      data: { nextOrder: this.items().length, item } satisfies ReadingPlanFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  /** Envía la lectura al historial de Lecturas anuales y la retira del plan. */
  protected async openSendModal(item: ReadingPlanItem): Promise<void> {
    const ref = this._dialog.open(SendToYearlyReadingModal, {
      width: '420px',
      maxWidth: '95vw',
      data: { item } satisfies SendToYearlyReadingModalData,
    });
    const sent = await firstValueFrom(ref.afterClosed());
    if (sent) await this.load();
  }

  protected async remove(item: ReadingPlanItem): Promise<void> {
    if (!confirm(`¿Eliminar "${item.title}" del plan de lectura?`)) return;

    try {
      await this._service.remove(item.id);
      await this.load();
    } catch (err) {
      this.error.set('No se ha podido eliminar la lectura. Inténtalo de nuevo.');
      console.error(err);
    }
  }
}
