import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { FandomService } from '../../../../services/fandom.service';
import { FanficService } from '../../../../services/fanfic.service';
import { AuthService } from '../../../../services/auth.service';
import { Fandom, Fanfic } from '@shared/models';
import { FORM_MODE } from '../../constants/library-form.constants';
import { DEFAULT_FANFIC_FILTERS, FanficFilters } from '../../models/fanfic-filters.model';
import { FanficDataDisplay } from '../fanfic-data-display/fanfic-data-display';
import {
  FanficDetailModal,
  FanficDetailModalData,
  FanficDetailModalResult,
} from '../fanfic-detail-modal/fanfic-detail-modal';
import {
  FanficFormModal,
  FanficFormModalData,
  FanficFormModalResult,
} from '../fanfic-form-modal/fanfic-form-modal';
import { FanficSearch } from '../fanfic-search/fanfic-search';

@Component({
  imports: [FanficDataDisplay, FanficSearch, MatIconModule, MatProgressSpinnerModule],
  selector: 'app-fanfic-section',
  styleUrl: './fanfic-section.css',
  templateUrl: './fanfic-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FanficSection implements OnInit {
  private readonly _fanficSrv = inject(FanficService);
  private readonly _fandomSrv = inject(FandomService);
  private readonly _dialog = inject(MatDialog);
  protected readonly authService = inject(AuthService);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  private readonly fanfics = signal<Fanfic[]>([]);
  protected readonly fandoms = signal<Fandom[]>([]);
  protected readonly filters = signal<FanficFilters>(DEFAULT_FANFIC_FILTERS);

  protected readonly displayItems = computed(() => applyFilters(this.fanfics(), this.filters()));

  ngOnInit(): void {
    this._loadFandoms();
    this._loadFanfics();
  }

  protected onFiltersChange(filters: FanficFilters): void {
    this.filters.set(filters);
  }

  /** Público: se invoca desde el botón "Añadir" de la cabecera común de `library.html`. */
  public openCreate(): void {
    this._openFormModal({ mode: FORM_MODE.ALTA });
  }

  // ---------- Ver detalle (al clicar sobre la tarjeta/fila) ----------

  protected onViewDetail(item: Fanfic): void {
    const ref = this._dialog.open<
      FanficDetailModal,
      FanficDetailModalData,
      FanficDetailModalResult
    >(FanficDetailModal, { data: { item }, width: '620px', maxWidth: '95vw', autoFocus: false });

    ref.afterClosed().subscribe((result) => {
      if (result?.edit) this._openFormModal({ mode: FORM_MODE.EDICION, fanficId: item.id });
    });
  }

  // ---------- Editar (desde el menú contextual) ----------

  protected onEditItem(item: Fanfic): void {
    this._openFormModal({ mode: FORM_MODE.EDICION, fanficId: item.id });
  }

  private _openFormModal(data: FanficFormModalData): void {
    const ref = this._dialog.open<FanficFormModal, FanficFormModalData, FanficFormModalResult>(
      FanficFormModal,
      { data, width: '760px', maxWidth: '95vw', autoFocus: false },
    );
    ref.afterClosed().subscribe((result) => {
      if (result?.saved) this._loadFanfics();
    });
  }

  protected async onDeleteItem(item: Fanfic): Promise<void> {
    if (!confirm(`¿Eliminar "${item.title}"? Esta acción no se puede deshacer.`)) return;
    try {
      await this._fanficSrv.remove(item.id);
      await this._loadFanfics();
    } catch (err) {
      this.error.set('No se ha podido eliminar el fanfic. Inténtalo de nuevo.');
      console.error(err);
    }
  }

  protected async onMarkFinished(item: Fanfic): Promise<void> {
    try {
      await this._fanficSrv.update(item.id, {
        readingStatus: 'finished' as Fanfic['readingStatus'],
        finishDate: new Date(),
      });
      await this._loadFanfics();
    } catch (err) {
      this.error.set('No se ha podido marcar como finalizado. Inténtalo de nuevo.');
      console.error(err);
    }
  }

  private async _loadFandoms(): Promise<void> {
    try {
      this.fandoms.set(await this._fandomSrv.getAll());
    } catch (err) {
      console.error(err);
    }
  }

  private async _loadFanfics(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      this.fanfics.set(await this._fanficSrv.getAll());
    } catch (err) {
      this.error.set('No se pudieron cargar los fanfics. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}

function applyFilters(items: Fanfic[], filters: FanficFilters): Fanfic[] {
  let result = items;

  if (filters.title) {
    const q = filters.title.toLowerCase();
    result = result.filter((i) => i.title.toLowerCase().includes(q));
  }
  if (filters.fandomId != null) {
    result = result.filter((i) => i.fandoms.some((f) => f.id === filters.fandomId));
  }
  if (filters.rating != null) {
    result = result.filter((i) => i.rating === filters.rating);
  }
  if (filters.readingStatus != null) {
    result = result.filter((i) => i.readingStatus === filters.readingStatus);
  }

  const dir = filters.sortDirection === 'desc' ? -1 : 1;
  result = [...result].sort((a, b) => {
    const va = fieldValue(a, filters.sortBy);
    const vb = fieldValue(b, filters.sortBy);
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
    return String(va).localeCompare(String(vb), 'es') * dir;
  });

  return result;
}

function fieldValue(item: Fanfic, field: FanficFilters['sortBy']): string | number | undefined {
  switch (field) {
    case 'title':
      return item.title;
    case 'author':
      return item.authors[0];
    case 'fandom':
      return item.fandoms.map((f) => f.name).join(', ');
    case 'ship':
      return item.ships.map((s) => s.characters.join(' / ')).join(' · ');
    case 'rating':
      return item.rating;
    case 'words':
      return item.words;
    case 'chapters':
      return item.chapters;
    case 'finishDate':
      return item.finishDate;
    case 'adquisitionDate':
      return item.adquisitionDate;
    default:
      return undefined;
  }
}