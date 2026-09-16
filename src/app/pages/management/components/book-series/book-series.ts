import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { BookSerieService } from '../../../../services/book-serie.service';
import { BookSerie } from '@shared/models';
import { MasterDataTable } from '../master-data-table/master-data-table';
import { MasterColumn } from '../../models/master-column.model';
import {
  BookSerieFormModal,
  BookSerieFormModalData,
} from '../book-serie-form-modal/book-serie-form-modal';
import { FORM_MODE } from '../../constants/management-form.constants';

@Component({
  selector: 'app-book-series',
  imports: [MasterDataTable],
  templateUrl: './book-series.html',
  styleUrl: './book-series.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSeries implements OnInit {
  private readonly _service = inject(BookSerieService);
  private readonly _dialog = inject(MatDialog);

  protected readonly items = signal<BookSerie[]>([]);
  protected readonly usedIds = signal<Set<number>>(new Set());
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly columns: MasterColumn<BookSerie>[] = [
    { key: 'title', header: 'Título', value: (s) => s.title },
    { key: 'editorial', header: 'Editorial', value: (s) => s.editorial.name },
  ];

  protected readonly isDeletable = (item: BookSerie) => !this.usedIds().has(item.id);

  async ngOnInit(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const [items, usedIds] = await Promise.all([
        this._service.getAll(),
        this._service.getUsedIds(),
      ]);
      this.items.set(items);
      this.usedIds.set(usedIds);
    } catch (err) {
      this.error.set('No se pudieron cargar las series. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  protected async openAdd(): Promise<void> {
    const ref = this._dialog.open(BookSerieFormModal, {
      width: '480px',
      maxWidth: '95vw',
      data: { mode: FORM_MODE.ALTA } satisfies BookSerieFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async openEdit(serie: BookSerie): Promise<void> {
    const ref = this._dialog.open(BookSerieFormModal, {
      width: '480px',
      maxWidth: '95vw',
      data: { mode: FORM_MODE.EDICION, serie } satisfies BookSerieFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async remove(serie: BookSerie): Promise<void> {
    if (this.usedIds().has(serie.id)) return;
    if (!confirm(`¿Eliminar la serie "${serie.title}"? Esta acción no se puede deshacer.`)) return;

    try {
      const usedIds = await this._service.getUsedIds();
      if (usedIds.has(serie.id)) {
        this.usedIds.set(usedIds);
        alert('Esta serie se ha empezado a usar en otro registro y ya no se puede eliminar.');
        return;
      }
      await this._service.remove(serie.id);
      await this.load();
    } catch (err) {
      this.error.set('No se ha podido eliminar la serie. Inténtalo de nuevo.');
      console.error(err);
    }
  }
}
