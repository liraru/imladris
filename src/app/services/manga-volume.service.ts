import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { EditorialRow, MangaVolumeRow } from '../shared/models/supabase.types';
import { MangaVolume } from '@shared/models';

const SELECT_FULL = `
  *,
  editorial:editorials(*),
  manga_volume_authors(author:authors(*))
`;

function toMangaVolume(row: MangaVolumeRow): MangaVolume {
  const editorial = row.editorial as EditorialRow;

  return {
    id: row.id,
    title: row.title,
    authors: (row.manga_volume_authors ?? []).map(({ author }) => ({
      id: author.id,
      name: author.name,
      country: author.country,
      notes: author.notes ?? undefined,
    })),
    mangaId: row.manga_id,
    volumeNumber: row.volume_number,
    readingStatus: row.reading_status,
    releaseDate: row.release_date ? row.release_date : undefined,
    coverImageUrl: row.cover_image_url ?? undefined,
    adquisitionDate: row.adquisition_date ? row.adquisition_date : undefined,
    startDate: row.start_date ? row.start_date : undefined,
    finishDate: row.finish_date ? row.finish_date : undefined,
    notes: row.notes ?? undefined,
    language: row.language,
    editorial: {
      id: editorial.id,
      name: editorial.name,
      country: editorial.country,
      website: editorial.website ?? undefined,
      logo: editorial.logo ?? undefined,
    },
  };
}

export interface MangaVolumeInput {
  title: string;
  authorIds: number[];
  mangaId: number;
  volumeNumber: number;
  readingStatus: MangaVolume['readingStatus'];
  releaseDate?: Date;
  coverImageUrl?: string;
  adquisitionDate?: Date;
  startDate?: Date;
  finishDate?: Date;
  notes?: string;
  language: MangaVolume['language'];
  editorialId: number;
}

function toDateString(date?: Date): string | null {
  return date ? date.toISOString().slice(0, 10) : null;
}

function toRow(input: Partial<MangaVolumeInput>) {
  const row: Record<string, unknown> = {};
  if (input.title !== undefined) row['title'] = input.title;
  if (input.mangaId !== undefined) row['manga_id'] = input.mangaId;
  if (input.volumeNumber !== undefined) row['volume_number'] = input.volumeNumber;
  if (input.readingStatus !== undefined) row['reading_status'] = input.readingStatus;
  if (input.releaseDate !== undefined) row['release_date'] = toDateString(input.releaseDate);
  if (input.coverImageUrl !== undefined) row['cover_image_url'] = input.coverImageUrl ?? null;
  if (input.adquisitionDate !== undefined)
    row['adquisition_date'] = toDateString(input.adquisitionDate);
  if (input.startDate !== undefined) row['start_date'] = toDateString(input.startDate);
  if (input.finishDate !== undefined) row['finish_date'] = toDateString(input.finishDate);
  if (input.notes !== undefined) row['notes'] = input.notes ?? null;
  if (input.language !== undefined) row['language'] = input.language;
  if (input.editorialId !== undefined) row['editorial_id'] = input.editorialId;
  return row;
}

@Injectable({ providedIn: 'root' })
export class MangaVolumeService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly table = 'manga_volumes';

  async getAll(): Promise<MangaVolume[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_FULL)
      .order('manga_id')
      .order('volume_number');
    if (error) throw error;
    return (data ?? []).map((row) => toMangaVolume(row as unknown as MangaVolumeRow));
  }

  async getByManga(mangaId: number): Promise<MangaVolume[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_FULL)
      .eq('manga_id', mangaId)
      .order('volume_number');
    if (error) throw error;
    return (data ?? []).map((row) => toMangaVolume(row as unknown as MangaVolumeRow));
  }

  async getById(id: number): Promise<MangaVolume | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_FULL)
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toMangaVolume(data as unknown as MangaVolumeRow) : null;
  }

  async create(input: MangaVolumeInput): Promise<MangaVolume> {
    const { data: inserted, error } = await this.supabase
      .from(this.table)
      .insert(toRow(input))
      .select('id')
      .single();
    if (error) throw error;

    const volumeId = (inserted as { id: number }).id;
    await this.syncAuthors(volumeId, input.authorIds);

    const created = await this.getById(volumeId);
    if (!created) throw new Error('No se pudo recuperar el tomo recién creado.');
    return created;
  }

  async update(id: number, input: Partial<MangaVolumeInput>): Promise<MangaVolume> {
    const patch = toRow(input);
    if (Object.keys(patch).length > 0) {
      const { error } = await this.supabase.from(this.table).update(patch).eq('id', id);
      if (error) throw error;
    }

    if (input.authorIds !== undefined) await this.syncAuthors(id, input.authorIds);

    const updated = await this.getById(id);
    if (!updated) throw new Error('No se pudo recuperar el tomo actualizado.');
    return updated;
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }

  private async syncAuthors(volumeId: number, authorIds: number[]): Promise<void> {
    const { error: deleteError } = await this.supabase
      .from('manga_volume_authors')
      .delete()
      .eq('manga_volume_id', volumeId);
    if (deleteError) throw deleteError;

    if (authorIds.length === 0) return;

    const { error: insertError } = await this.supabase
      .from('manga_volume_authors')
      .insert(authorIds.map((authorId) => ({ manga_volume_id: volumeId, author_id: authorId })));
    if (insertError) throw insertError;
  }
}
