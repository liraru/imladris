import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

/** Textos del paginador de Angular Material en castellano, con "Página X de Y". */
@Injectable()
export class SpanishPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementos por página:';
  override nextPageLabel = 'Página siguiente';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) return 'Página 1 de 1 · 0 de 0';
    const totalPages = Math.max(1, Math.ceil(length / pageSize));
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return `Página ${page + 1} de ${totalPages} · ${start} – ${end} de ${length}`;
  };
}
