import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { FandomRow } from '../shared/models/supabase.types';
import { Fandom } from '@shared/models';

function toFandom(row: FandomRow): Fandom {
  return { id: row.id, name: row.name, origin: row.origin };
}

@Injectable({ providedIn: 'root' })
export class FandomService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly table = 'fandoms';

  async getAll(): Promise<Fandom[]> {
    const { data, error } = await this.supabase.from(this.table).select('*').order('name');
    if (error) throw error;
    return (data ?? []).map(toFandom);
  }

  async getById(id: number): Promise<Fandom | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toFandom(data) : null;
  }

  async create(fandom: Omit<Fandom, 'id'>): Promise<Fandom> {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert({ name: fandom.name, origin: fandom.origin })
      .select()
      .single();
    if (error) throw error;
    return toFandom(data);
  }

  async update(id: number, fandom: Partial<Omit<Fandom, 'id'>>): Promise<Fandom> {
    const patch: Record<string, unknown> = {};
    if (fandom.name !== undefined) patch['name'] = fandom.name;
    if (fandom.origin !== undefined) patch['origin'] = fandom.origin;

    const { data, error } = await this.supabase
      .from(this.table)
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return toFandom(data);
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }

  /** Ids de fandoms referenciados desde fanfics o ships (para no permitir borrarlos). */
  async getUsedIds(): Promise<Set<number>> {
    const [fanfics, ships] = await Promise.all([
      this.supabase.from('fanfics').select('fandom_id'),
      this.supabase.from('ships').select('fandom_id'),
    ]);
    if (fanfics.error) throw fanfics.error;
    if (ships.error) throw ships.error;

    const ids = new Set<number>();
    for (const row of fanfics.data ?? []) ids.add((row as { fandom_id: number }).fandom_id);
    for (const row of ships.data ?? []) ids.add((row as { fandom_id: number }).fandom_id);
    return ids;
  }
}
