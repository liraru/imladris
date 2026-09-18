import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { AuthorService } from '../../../../services/author.service';
import { Author } from '@shared/models';
import { COUNTRY_LABELS } from '../../../../shared/constants/countries.constant';
import { MasterDataTable } from '../master-data-table/master-data-table';
import { MasterColumn } from '../../models/master-column.model';
import { AuthorFormModal, AuthorFormModalData } from '../author-form-modal/author-form-modal';
import { FORM_MODE } from '../../constants/management-form.constants';

@Component({
  selector: 'app-authors',
  imports: [MasterDataTable],
  templateUrl: './authors.html',
  styleUrl: './authors.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Authors implements OnInit {
  private readonly _service = inject(AuthorService);
  private readonly _dialog = inject(MatDialog);

  protected readonly items = signal<Author[]>([]);
  protected readonly usedIds = signal<Set<number>>(new Set());
  protected readonly usageCounts = signal<Map<number, number>>(new Map());
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly columns: MasterColumn<Author>[] = [
    { key: 'name', header: 'Nombre', value: (a) => a.name },
    { key: 'country', header: 'País', value: (a) => COUNTRY_LABELS[a.country] },
    { key: 'notes', header: 'Notas', value: (a) => a.notes ?? '—' },
    {
      key: 'usageCount',
      header: 'Registros',
      value: (a) => String(this.usageCounts().get(a.id) ?? 0),
    },
  ];

  protected readonly isDeletable = (item: Author) => !this.usedIds().has(item.id);

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
      this.error.set('No se pudieron cargar los autores. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  protected async openAdd(): Promise<void> {
    const ref = this._dialog.open(AuthorFormModal, {
      width: '480px',
      maxWidth: '95vw',
      data: { mode: FORM_MODE.ALTA } satisfies AuthorFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async openEdit(author: Author): Promise<void> {
    const ref = this._dialog.open(AuthorFormModal, {
      width: '480px',
      maxWidth: '95vw',
      data: { mode: FORM_MODE.EDICION, author } satisfies AuthorFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async remove(author: Author): Promise<void> {
    if (this.usedIds().has(author.id)) return;
    if (!confirm(`¿Eliminar a "${author.name}"? Esta acción no se puede deshacer.`)) return;

    try {
      const usedIds = await this._service.getUsedIds();
      if (usedIds.has(author.id)) {
        this.usedIds.set(usedIds);
        alert('Este autor se ha empezado a usar en otro registro y ya no se puede eliminar.');
        return;
      }
      await this._service.remove(author.id);
      await this.load();
    } catch (err) {
      this.error.set('No se ha podido eliminar el autor. Inténtalo de nuevo.');
      console.error(err);
    }
  }
}
