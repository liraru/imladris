import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MasterColumn } from '../../models/master-column.model';

const PAGE_SIZE = 25;

@Component({
  selector: 'app-master-data-table',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
  ],
  templateUrl: './master-data-table.html',
  styleUrl: './master-data-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterDataTable<T extends { id: number }> {
  public readonly columns = input.required<MasterColumn<T>[]>();
  public readonly items = input.required<T[]>();
  public readonly loading = input<boolean>(false);
  public readonly isDeletable = input<(item: T) => boolean>(() => true);
  public readonly addLabel = input<string>('Añadir');
  public readonly searchPlaceholder = input<string>('Buscar…');
  public readonly emptyMessage = input<string>('No hay registros.');

  public readonly add = output<void>();
  public readonly edit = output<T>();
  public readonly delete = output<T>();

  protected readonly searchCtrl = new FormControl('', { nonNullable: true });

  private readonly search = toSignal(
    this.searchCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => value.toLowerCase().trim()),
    ),
    { initialValue: '' },
  );

  protected readonly pageSize = PAGE_SIZE;
  protected readonly pageIndex = signal(0);

  protected readonly filteredItems = computed(() => {
    const query = this.search();
    const items = this.items();
    if (!query) return items;
    const cols = this.columns();
    return items.filter((item) =>
      cols.some((col) => (col.value(item) ?? '').toLowerCase().includes(query)),
    );
  });

  /** Ajusta el índice de página si el filtrado deja menos páginas de las que había. */
  protected readonly clampedPageIndex = computed(() => {
    const total = this.filteredItems().length;
    const maxIndex = Math.max(0, Math.ceil(total / this.pageSize) - 1);
    return Math.min(this.pageIndex(), maxIndex);
  });

  protected readonly pagedItems = computed(() => {
    const start = this.clampedPageIndex() * this.pageSize;
    return this.filteredItems().slice(start, start + this.pageSize);
  });

  protected readonly displayedColumns = computed(() => [
    ...this.columns().map((c) => c.key),
    'actions',
  ]);

  protected onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
  }

  protected canDelete(item: T): boolean {
    return this.isDeletable()(item);
  }
}
