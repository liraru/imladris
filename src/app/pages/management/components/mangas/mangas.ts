import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { MangaService } from '../../../../services/manga.service';
import { Manga } from '@shared/models';
import { DEMOGRAPHIC_LABELS, GENRE_LABELS } from '../../../../shared/constants/categories.constant';
import { MasterDataTable } from '../master-data-table/master-data-table';
import { MasterColumn } from '../../models/master-column.model';
import { MangaFormModal, MangaFormModalData } from '../manga-form-modal/manga-form-modal';
import { FORM_MODE } from '../../constants/management-form.constants';

@Component({
  selector: 'app-mangas',
  imports: [MasterDataTable],
  templateUrl: './mangas.html',
  styleUrl: './mangas.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Mangas implements OnInit {
  private readonly _service = inject(MangaService);
  private readonly _dialog = inject(MatDialog);

  protected readonly items = signal<Manga[]>([]);
  protected readonly usedIds = signal<Set<number>>(new Set());
  protected readonly usageCounts = signal<Map<number, number>>(new Map());
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly columns: MasterColumn<Manga>[] = [
    { key: 'title', header: 'Título', value: (m) => m.title },
    { key: 'demographic', header: 'Demografía', value: (m) => DEMOGRAPHIC_LABELS[m.demographic] },
    {
      key: 'authors',
      header: 'Autores',
      value: (m) => (m.authors.length ? m.authors.map((a) => a.name).join(', ') : '—'),
    },
    {
      key: 'genres',
      header: 'Géneros',
      value: (m) => (m.genres.length ? m.genres.map((g) => GENRE_LABELS[g]).join(', ') : '—'),
    },
    {
      key: 'usageCount',
      header: 'Registros',
      value: (m) => String(this.usageCounts().get(m.id) ?? 0),
    },
  ];

  protected readonly isDeletable = (item: Manga) => !this.usedIds().has(item.id);

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
      this.error.set('No se pudieron cargar los mangas. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  protected async openAdd(): Promise<void> {
    const ref = this._dialog.open(MangaFormModal, {
      width: '560px',
      maxWidth: '95vw',
      disableClose: true,
      data: { mode: FORM_MODE.ALTA } satisfies MangaFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async openEdit(manga: Manga): Promise<void> {
    const ref = this._dialog.open(MangaFormModal, {
      width: '560px',
      maxWidth: '95vw',
      disableClose: true,
      data: { mode: FORM_MODE.EDICION, manga } satisfies MangaFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    if (saved) await this.load();
  }

  protected async remove(manga: Manga): Promise<void> {
    if (this.usedIds().has(manga.id)) return;
    if (!confirm(`¿Eliminar "${manga.title}"? Esta acción no se puede deshacer.`)) return;

    try {
      const usedIds = await this._service.getUsedIds();
      if (usedIds.has(manga.id)) {
        this.usedIds.set(usedIds);
        alert('Este manga se ha empezado a usar en otro registro y ya no se puede eliminar.');
        return;
      }
      await this._service.remove(manga.id);
      await this.load();
    } catch (err) {
      this.error.set('No se ha podido eliminar el manga. Inténtalo de nuevo.');
      console.error(err);
    }
  }
}
