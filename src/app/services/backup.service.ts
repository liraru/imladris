import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

interface BackupTable {
  name: string;
  /** Columnas de ordenación: hace estable la paginación (las tablas puente no tienen `id`). */
  orderBy: string[];
}

/** Tablas incluidas en el backup: maestros → entidades → tablas puente → lecturas. */
const BACKUP_TABLES: BackupTable[] = [
  { name: 'authors', orderBy: ['id'] },
  { name: 'editorials', orderBy: ['id'] },
  { name: 'book_series', orderBy: ['id'] },
  { name: 'books', orderBy: ['id'] },
  { name: 'book_authors', orderBy: ['book_id', 'author_id'] },
  { name: 'book_genres', orderBy: ['book_id', 'genre'] },
  { name: 'mangas', orderBy: ['id'] },
  { name: 'manga_authors', orderBy: ['manga_id', 'author_id'] },
  { name: 'manga_genres', orderBy: ['manga_id', 'genre'] },
  { name: 'manga_volumes', orderBy: ['id'] },
  { name: 'manga_volume_authors', orderBy: ['manga_volume_id', 'author_id'] },
  { name: 'fandoms', orderBy: ['id'] },
  { name: 'ships', orderBy: ['id'] },
  { name: 'fanfics', orderBy: ['id'] },
  { name: 'fanfic_fandoms', orderBy: ['fanfic_id', 'fandom_id'] },
  { name: 'fanfic_ships', orderBy: ['fanfic_id', 'ship_id'] },
  { name: 'yearly_readings', orderBy: ['id'] },
  { name: 'reading_progress', orderBy: ['id'] },
  { name: 'reading_plan', orderBy: ['id'] },
];

/** Supabase (PostgREST) devuelve como máximo 1000 filas por petición. */
const PAGE_SIZE = 1000;

/**
 * Genera y descarga una copia de seguridad de los datos de la aplicación en un único
 * fichero JSON (`{ app, version, generatedAt, tables: { <tabla>: filas[] } }`).
 * Es un volcado de datos (no incluye la estructura ni las políticas RLS).
 */
@Injectable({ providedIn: 'root' })
export class BackupService {
  private readonly supabase = inject(SupabaseService).client;

  /** Lee todas las tablas y dispara la descarga del fichero. Devuelve el nombre del fichero. */
  async download(): Promise<string> {
    const tables: Record<string, unknown[]> = {};
    for (const table of BACKUP_TABLES) {
      tables[table.name] = await this._fetchAll(table);
    }

    const backup = {
      app: 'imladris',
      version: 1,
      generatedAt: new Date().toISOString(),
      tables,
    };

    const fileName = `imladris-backup-${this._today()}.json`;
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    return fileName;
  }

  private async _fetchAll(table: BackupTable): Promise<unknown[]> {
    const rows: unknown[] = [];
    for (let from = 0; ; from += PAGE_SIZE) {
      let query = this.supabase.from(table.name).select('*');
      for (const column of table.orderBy) query = query.order(column, { ascending: true });

      const { data, error } = await query.range(from, from + PAGE_SIZE - 1);
      if (error) throw error;

      const page = data ?? [];
      rows.push(...page);
      if (page.length < PAGE_SIZE) break;
    }
    return rows;
  }

  /** Fecha local yyyy-MM-dd (sin el desfase UTC de `toISOString()`). */
  private _today(): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
