import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { BookSerieRow, EditorialRow } from '../shared/models/supabase.types';
import { BookSerie } from '@shared/models';

const SELECT_WITH_EDITORIAL = '*, editorial:editorials(*)';

function toBookSerie(row: BookSerieRow): BookSerie {
  const editorial = row.editorial as EditorialRow;
  return {
    id: row.id,
    title: row.title,
    editorial: {
      id: editorial.id,
      name: editorial.name,
      country: editorial.country,
      website: editorial.website ?? undefined,
      logo: editorial.logo ?? undefined,
    },
  };
}

@Injectable({ providedIn: 'root' })
export class BookSerieService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly table = 'book_series';

  async getAll(): Promise<BookSerie[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_WITH_EDITORIAL)
      .order('title');
    if (error) throw error;
    return (data ?? []).map((row) => toBookSerie(row as unknown as BookSerieRow));
  }

  async getById(id: number): Promise<BookSerie | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_WITH_EDITORIAL)
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toBookSerie(data as unknown as BookSerieRow) : null;
  }

  async create(serie: { title: string; editorialId: number }): Promise<BookSerie> {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert({ title: serie.title, editorial_id: serie.editorialId })
      .select(SELECT_WITH_EDITORIAL)
      .single();
    if (error) throw error;
    return toBookSerie(data as unknown as BookSerieRow);
  }

  async update(id: number, serie: { title?: string; editorialId?: number }): Promise<BookSerie> {
    const patch: Record<string, unknown> = {};
    if (serie.title !== undefined) patch['title'] = serie.title;
    if (serie.editorialId !== undefined) patch['editorial_id'] = serie.editorialId;

    const { data, error } = await this.supabase
      .from(this.table)
      .update(patch)
      .eq('id', id)
      .select(SELECT_WITH_EDITORIAL)
      .single();
    if (error) throw error;
    return toBookSerie(data as unknown as BookSerieRow);
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }
}
