import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { FandomService } from '../../../../services/fandom.service';
import { Fandom } from '@shared/models';
import { MasterDataTable } from '../master-data-table/master-data-table';
import { MasterColumn } from '../../models/master-column.model';
import { FandomFormModal, FandomFormModalData } from '../fandom-form-modal/fandom-form-modal';
import { FORM_MODE } from '../../constants/management-form.constants';

@Component({
  selector: 'app-fandoms',
  imports: [MasterDataTable],
  templateUrl: './fandoms.html',
  styleUrl: './fandoms.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fandoms implements OnInit {
  private readonly _service = inject(FandomService);
  private readonly _dialog = inject(MatDialog);

  protected readonly items = signal<Fandom[]>([]);
  protected readonly usedIds = signal<Set<number>>(new Set());
  protected readonly usageCounts = signal<Map<number, number>>(new Map());
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly columns: MasterColumn<Fandom>[] = [
    { key: 'name', header: 'Nombre', value: (f) => f.name },
    { key: 'origin', header: 'Origen', value: (f) => f.origin },
    {
      key: 'usageCount',
      header: 'Registros',
      value: (f) => String(this.usageCounts().get(f.id) ?? 0),
    },
  ];

  protected readonly isDeletable = (item: Fandom) => !this.usedIds().has(item.id);

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const [items, usedIds, usageCounts] = await Promise.all([
        this._service.getAll(),
        this._service.getUsedIds(),
        this._service.getUsageCounts(),
      ]);
      this.items.set(items);
      this.usedIds.set(usedIds);
      this.usageCounts.set(usageCounts);
    } catch (err) {
      this.error.set('No se pudieron cargar los fandoms. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  protected async openAdd(): Promise<void> {
    const ref = this._dialog.open(FandomFormModal, {
      width: '480px',
      maxWidth: '95vw',
      data: { mode: FORM_MODE.ALTA } satisfies FandomFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async openEdit(fandom: Fandom): Promise<void> {
    const ref = this._dialog.open(FandomFormModal, {
      width: '480px',
      maxWidth: '95vw',
      data: { mode: FORM_MODE.EDICION, fandom } satisfies FandomFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async remove(fandom: Fandom): Promise<void> {
    if (this.usedIds().has(fandom.id)) return;
    if (!confirm(`¿Eliminar el fandom "${fandom.name}"? Esta acción no se puede deshacer.`)) return;

    try {
      const usedIds = await this._service.getUsedIds();
      if (usedIds.has(fandom.id)) {
        this.usedIds.set(usedIds);
        alert('Este fandom se ha empezado a usar en otro registro y ya no se puede eliminar.');
        return;
      }
      await this._service.remove(fandom.id);
      await this.load();
    } catch (err) {
      this.error.set('No se ha podido eliminar el fandom. Inténtalo de nuevo.');
      console.error(err);
    }
  }
}
