import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { EditorialService } from '../../../../services/editorial.service';
import { Editorial } from '@shared/models';
import { COUNTRY_LABELS } from '../../../../shared/constants/countries.constant';
import { MasterDataTable } from '../master-data-table/master-data-table';
import { MasterColumn } from '../../models/master-column.model';
import {
  EditorialFormModal,
  EditorialFormModalData,
} from '../editorial-form-modal/editorial-form-modal';
import { FORM_MODE } from '../../constants/management-form.constants';

@Component({
  selector: 'app-editorials',
  imports: [MasterDataTable],
  templateUrl: './editorials.html',
  styleUrl: './editorials.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Editorials implements OnInit {
  private readonly _service = inject(EditorialService);
  private readonly _dialog = inject(MatDialog);

  protected readonly items = signal<Editorial[]>([]);
  protected readonly usedIds = signal<Set<number>>(new Set());
  protected readonly usageCounts = signal<Map<number, number>>(new Map());
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly columns: MasterColumn<Editorial>[] = [
    { key: 'name', header: 'Nombre', value: (e) => e.name },
    { key: 'country', header: 'País', value: (e) => COUNTRY_LABELS[e.country] },
    { key: 'website', header: 'Web', value: (e) => e.website ?? '—' },
    {
      key: 'usageCount',
      header: 'Registros',
      value: (e) => String(this.usageCounts().get(e.id) ?? 0),
    },
  ];

  protected readonly isDeletable = (item: Editorial) => !this.usedIds().has(item.id);

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
      this.error.set('No se pudieron cargar las editoriales. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  protected async openAdd(): Promise<void> {
    const ref = this._dialog.open(EditorialFormModal, {
      width: '480px',
      maxWidth: '95vw',
      data: { mode: FORM_MODE.ALTA } satisfies EditorialFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async openEdit(editorial: Editorial): Promise<void> {
    const ref = this._dialog.open(EditorialFormModal, {
      width: '480px',
      maxWidth: '95vw',
      data: { mode: FORM_MODE.EDICION, editorial } satisfies EditorialFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async remove(editorial: Editorial): Promise<void> {
    if (this.usedIds().has(editorial.id)) return;
    if (!confirm(`¿Eliminar "${editorial.name}"? Esta acción no se puede deshacer.`)) return;

    try {
      const usedIds = await this._service.getUsedIds();
      if (usedIds.has(editorial.id)) {
        this.usedIds.set(usedIds);
        alert('Esta editorial se ha empezado a usar en otro registro y ya no se puede eliminar.');
        return;
      }
      await this._service.remove(editorial.id);
      await this.load();
    } catch (err) {
      this.error.set('No se ha podido eliminar la editorial. Inténtalo de nuevo.');
      console.error(err);
    }
  }
}
