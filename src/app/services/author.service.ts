import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthorRow } from '../shared/models/supabase.types';
import { Author } from '@shared/models';

function toAuthor(row: AuthorRow): Author {
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    notes: row.notes ?? undefined,
  };
}

function toRow(author: Omit<Author, 'id'>) {
  return {
    name: author.name,
    country: author.country,
    notes: author.notes ?? null,
  };
}

@Injectable({ providedIn: 'root' })
export class AuthorService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly table = 'authors';

  async getAll(): Promise<Author[]> {
    const { data, error } = await this.supabase.from(this.table).select('*').order('name');
    if (error) throw error;
    return (data ?? []).map(toAuthor);
  }

  async getById(id: number): Promise<Author | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toAuthor(data) : null;
  }

  async create(author: Omit<Author, 'id'>): Promise<Author> {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert(toRow(author))
      .select()
      .single();
    if (error) throw error;
    return toAuthor(data);
  }

  async update(id: number, author: Partial<Omit<Author, 'id'>>): Promise<Author> {
    const patch: Record<string, unknown> = {};
    if (author.name !== undefined) patch['name'] = author.name;
    if (author.country !== undefined) patch['country'] = author.country;
    if (author.notes !== undefined) patch['notes'] = author.notes ?? null;

    const { data, error } = await this.supabase
      .from(this.table)
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return toAuthor(data);
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }
}
