import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { ShipService } from '../../../../services/ship.service';
import { Ship } from '@shared/models';
import { MasterDataTable } from '../master-data-table/master-data-table';
import { MasterColumn } from '../../models/master-column.model';
import { ShipFormModal, ShipFormModalData } from '../ship-form-modal/ship-form-modal';
import { FORM_MODE } from '../../constants/management-form.constants';

@Component({
  selector: 'app-ships',
  imports: [MasterDataTable],
  templateUrl: './ships.html',
  styleUrl: './ships.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ships implements OnInit {
  private readonly _service = inject(ShipService);
  private readonly _dialog = inject(MatDialog);

  protected readonly items = signal<Ship[]>([]);
  protected readonly usedIds = signal<Set<number>>(new Set());
  protected readonly usageCounts = signal<Map<number, number>>(new Map());
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly columns: MasterColumn<Ship>[] = [
    { key: 'characters', header: 'Personajes', value: (s) => s.characters.join(' / ') },
    { key: 'fandom', header: 'Fandom', value: (s) => s.fandom.name },
    {
      key: 'usageCount',
      header: 'Registros',
      value: (s) => String(this.usageCounts().get(s.id) ?? 0),
    },
  ];

  protected readonly isDeletable = (item: Ship) => !this.usedIds().has(item.id);

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
      this.error.set('No se pudieron cargar los ships. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  protected async openAdd(): Promise<void> {
    const ref = this._dialog.open(ShipFormModal, {
      width: '480px',
      maxWidth: '95vw',
      data: { mode: FORM_MODE.ALTA } satisfies ShipFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async openEdit(ship: Ship): Promise<void> {
    const ref = this._dialog.open(ShipFormModal, {
      width: '480px',
      maxWidth: '95vw',
      data: { mode: FORM_MODE.EDICION, ship } satisfies ShipFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async remove(ship: Ship): Promise<void> {
    if (this.usedIds().has(ship.id)) return;
    const label = ship.characters.join(' / ');
    if (!confirm(`¿Eliminar el ship "${label}"? Esta acción no se puede deshacer.`)) return;

    try {
      const usedIds = await this._service.getUsedIds();
      if (usedIds.has(ship.id)) {
        this.usedIds.set(usedIds);
        alert('Este ship se ha empezado a usar en otro registro y ya no se puede eliminar.');
        return;
      }
      await this._service.remove(ship.id);
      await this.load();
    } catch (err) {
      this.error.set('No se ha podido eliminar el ship. Inténtalo de nuevo.');
      console.error(err);
    }
  }
}
