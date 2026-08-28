import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { MangaRow } from '../shared/models/supabase.types';
import { Manga } from '@shared/models';
import { DEMOGRAPHIC, GENRE } from '../shared/constants/categories.constant';

const SELECT_FULL = `
  *,
  manga_authors(author:authors(*)),
  manga_genres(genre)
`;

function toManga(row: MangaRow): Manga {
  return {
    id: row.id,
    title: row.title,
    authors: (row.manga_authors ?? []).map(({ author }) => ({
      id: author.id,
      name: author.name,
      country: author.country,
      notes: author.notes ?? undefined,
    })),
    demographic: row.demographic,
    genres: (row.manga_genres ?? []).map(({ genre }) => genre),
  };
}

export interface MangaInput {
  title: string;
  authorIds: number[];
  demographic: DEMOGRAPHIC;
  genres: GENRE[];
}

@Injectable({ providedIn: 'root' })
export class MangaService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly table = 'mangas';

  async getAll(): Promise<Manga[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_FULL)
      .order('title');
    if (error) throw error;
    return (data ?? []).map((row) => toManga(row as unknown as MangaRow));
  }

  async getById(id: number): Promise<Manga | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_FULL)
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toManga(data as unknown as MangaRow) : null;
  }

  async create(input: MangaInput): Promise<Manga> {
    const { data: inserted, error } = await this.supabase
      .from(this.table)
      .insert({ title: input.title, demographic: input.demographic })
      .select('id')
      .single();
    if (error) throw error;

    const mangaId = (inserted as { id: number }).id;
    await this.syncAuthors(mangaId, input.authorIds);
    await this.syncGenres(mangaId, input.genres);

    const created = await this.getById(mangaId);
    if (!created) throw new Error('No se pudo recuperar el manga recién creado.');
    return created;
  }

  async update(id: number, input: Partial<MangaInput>): Promise<Manga> {
    const patch: Record<string, unknown> = {};
    if (input.title !== undefined) patch['title'] = input.title;
    if (input.demographic !== undefined) patch['demographic'] = input.demographic;

    if (Object.keys(patch).length > 0) {
      const { error } = await this.supabase.from(this.table).update(patch).eq('id', id);
      if (error) throw error;
    }

    if (input.authorIds !== undefined) await this.syncAuthors(id, input.authorIds);
    if (input.genres !== undefined) await this.syncGenres(id, input.genres);

    const updated = await this.getById(id);
    if (!updated) throw new Error('No se pudo recuperar el manga actualizado.');
    return updated;
  }

  async remove(id: number): Promise<void> {
    // manga_authors, manga_genres y manga_volumes se borran en cascada.
    const { error } = await this.supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }

  private async syncAuthors(mangaId: number, authorIds: number[]): Promise<void> {
    const { error: deleteError } = await this.supabase
      .from('manga_authors')
      .delete()
      .eq('manga_id', mangaId);
    if (deleteError) throw deleteError;

    if (authorIds.length === 0) return;

    const { error: insertError } = await this.supabase
      .from('manga_authors')
      .insert(authorIds.map((authorId) => ({ manga_id: mangaId, author_id: authorId })));
    if (insertError) throw insertError;
  }

  private async syncGenres(mangaId: number, genres: GENRE[]): Promise<void> {
    const { error: deleteError } = await this.supabase
      .from('manga_genres')
      .delete()
      .eq('manga_id', mangaId);
    if (deleteError) throw deleteError;

    if (genres.length === 0) return;

    const { error: insertError } = await this.supabase
      .from('manga_genres')
      .insert(genres.map((genre) => ({ manga_id: mangaId, genre })));
    if (insertError) throw insertError;
  }
}
