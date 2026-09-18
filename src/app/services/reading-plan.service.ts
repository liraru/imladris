import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { ReadingPlanRow } from '../shared/models/supabase.types';
import { ReadingPlanItem } from '@shared/models';

function toPlanItem(row: ReadingPlanRow): ReadingPlanItem {
  return {
    id: row.id,
    title: row.title,
    authors: row.authors ?? [],
    pages: row.pages,
    coverUrl: row.cover_url ?? '',
    order: row.order,
  };
}

export type ReadingPlanInput = Omit<ReadingPlanItem, 'id'>;

function toRow(input: Partial<ReadingPlanInput>) {
  const row: Record<string, unknown> = {};
  if (input.title !== undefined) row['title'] = input.title;
  if (input.authors !== undefined) row['authors'] = input.authors;
  if (input.pages !== undefined) row['pages'] = input.pages;
  if (input.coverUrl !== undefined) row['cover_url'] = input.coverUrl || null;
  if (input.order !== undefined) row['order'] = input.order;
  return row;
}

@Injectable({ providedIn: 'root' })
export class ReadingPlanService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly table = 'reading_plan';

  /** Ordenado por el campo `order` (orden manual definido por el usuario). */
  async getAll(): Promise<ReadingPlanItem[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .order('order', { ascending: true });
    if (error) throw error;
    return (data ?? []).map((row) => toPlanItem(row as ReadingPlanRow));
  }

  async create(input: ReadingPlanInput): Promise<ReadingPlanItem> {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert(toRow(input))
      .select('*')
      .single();
    if (error) throw error;
    return toPlanItem(data as ReadingPlanRow);
  }

  async update(id: number, input: Partial<ReadingPlanInput>): Promise<ReadingPlanItem> {
    const { data, error } = await this.supabase
      .from(this.table)
      .update(toRow(input))
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return toPlanItem(data as ReadingPlanRow);
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }

  /**
   * Persiste el nuevo `order` tras un arrastre. Solo recibe las filas realmente
   * afectadas (el tramo entre la posición de origen y destino), no todo el listado.
   */
  async reorder(updates: { id: number; order: number }[]): Promise<void> {
    const requests = updates.map(({ id, order }) =>
      this.supabase.from(this.table).update({ order }).eq('id', id),
    );
    const results = await Promise.all(requests);
    const failed = results.find((r) => r.error);
    if (failed?.error) throw failed.error;
  }
}
