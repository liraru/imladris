import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { EditorialRow } from '../shared/models/supabase.types';
import { Editorial } from '@shared/models';

function toEditorial(row: EditorialRow): Editorial {
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    website: row.website ?? undefined,
    logo: row.logo ?? undefined,
  };
}

@Injectable({ providedIn: 'root' })
export class EditorialService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly table = 'editorials';

  async getAll(): Promise<Editorial[]> {
    const { data, error } = await this.supabase.from(this.table).select('*').order('name');
    if (error) throw error;
    return (data ?? []).map(toEditorial);
  }

  async getById(id: number): Promise<Editorial | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toEditorial(data) : null;
  }

  async create(editorial: Omit<Editorial, 'id'>): Promise<Editorial> {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert({
        name: editorial.name,
        country: editorial.country,
        website: editorial.website ?? null,
        logo: editorial.logo ?? null,
      })
      .select()
      .single();
    if (error) throw error;
    return toEditorial(data);
  }

  async update(id: number, editorial: Partial<Omit<Editorial, 'id'>>): Promise<Editorial> {
    const patch: Record<string, unknown> = {};
    if (editorial.name !== undefined) patch['name'] = editorial.name;
    if (editorial.country !== undefined) patch['country'] = editorial.country;
    if (editorial.website !== undefined) patch['website'] = editorial.website ?? null;
    if (editorial.logo !== undefined) patch['logo'] = editorial.logo ?? null;

    const { data, error } = await this.supabase
      .from(this.table)
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return toEditorial(data);
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }
}
