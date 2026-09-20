import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { FandomRow, FanficRow, ShipRow } from '../shared/models/supabase.types';
import { Fanfic } from '@shared/models';

const SELECT_FULL = `
  *,
  fandom:fandoms(*),
  ship:ships(*, fandom:fandoms(*))
`;

function toFanfic(row: FanficRow): Fanfic {
  const fandom = row.fandom as FandomRow;
  const ship = row.ship as ShipRow;
  const shipFandom = ship.fandom as FandomRow;

  return {
    id: row.id,
    title: row.title,
    authors: row.authors ?? [],
    fandom: { id: fandom.id, name: fandom.name, origin: fandom.origin },
    ship: {
      id: ship.id,
      characters: ship.characters ?? [],
      fandom: { id: shipFandom.id, name: shipFandom.name, origin: shipFandom.origin },
    },
    rating: row.rating,
    words: row.words,
    chapters: row.chapters,
    pages: row.pages ?? undefined,
    readingStatus: row.reading_status,
    releaseDate: row.release_date ?? undefined,
    adquisitionDate: row.adquisition_date ?? undefined,
    startDate: row.start_date ?? undefined,
    finishDate: row.finish_date ?? undefined,
    triggerWarnings: row.trigger_warnings ?? undefined,
    language: row.language,
    tags: row.tags ?? undefined,
    summary: row.summary ?? undefined,
    fileUrl: row.file_url ?? undefined,
    originalUrl: row.original_url ?? undefined,
    coverUrl: row.cover_url ?? undefined,
    notes: row.notes ?? undefined,
  };
}

/** Datos necesarios para crear/editar un fanfic, en forma "plana" (ids en vez de objetos). */
export interface FanficInput {
  title: string;
  authors: string[];
  fandomId: number;
  shipId: number;
  rating: Fanfic['rating'];
  words: number;
  chapters: number;
  pages?: number;
  readingStatus: Fanfic['readingStatus'];
  releaseDate?: Date;
  adquisitionDate?: Date;
  startDate?: Date;
  finishDate?: Date;
  triggerWarnings?: string[];
  language: Fanfic['language'];
  tags?: string[];
  summary?: string;
  fileUrl?: string;
  originalUrl?: string;
  coverUrl?: string;
  notes?: string;
}

function toDateString(date?: Date): string | null {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toRow(input: Partial<FanficInput>) {
  const row: Record<string, unknown> = {};
  if (input.title !== undefined) row['title'] = input.title;
  if (input.authors !== undefined) row['authors'] = input.authors;
  if (input.fandomId !== undefined) row['fandom_id'] = input.fandomId;
  if (input.shipId !== undefined) row['ship_id'] = input.shipId;
  if (input.rating !== undefined) row['rating'] = input.rating;
  if (input.words !== undefined) row['words'] = input.words;
  if (input.chapters !== undefined) row['chapters'] = input.chapters;
  if (input.pages !== undefined) row['pages'] = input.pages ?? null;
  if (input.readingStatus !== undefined) row['reading_status'] = input.readingStatus;
  if (input.releaseDate !== undefined) row['release_date'] = toDateString(input.releaseDate);
  if (input.adquisitionDate !== undefined)
    row['adquisition_date'] = toDateString(input.adquisitionDate);
  if (input.startDate !== undefined) row['start_date'] = toDateString(input.startDate);
  if (input.finishDate !== undefined) row['finish_date'] = toDateString(input.finishDate);
  if (input.triggerWarnings !== undefined) row['trigger_warnings'] = input.triggerWarnings ?? [];
  if (input.language !== undefined) row['language'] = input.language;
  if (input.tags !== undefined) row['tags'] = input.tags ?? [];
  if (input.summary !== undefined) row['summary'] = input.summary ?? null;
  if (input.fileUrl !== undefined) row['file_url'] = input.fileUrl ?? null;
  if (input.originalUrl !== undefined) row['original_url'] = input.originalUrl ?? null;
  if (input.coverUrl !== undefined) row['cover_url'] = input.coverUrl ?? null;
  if (input.notes !== undefined) row['notes'] = input.notes ?? null;
  return row;
}

@Injectable({ providedIn: 'root' })
export class FanficService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly table = 'fanfics';

  async getAll(): Promise<Fanfic[]> {
    const { data, error } = await this.supabase.from(this.table).select(SELECT_FULL).order('title');
    if (error) throw error;
    return (data ?? []).map((row) => toFanfic(row as unknown as FanficRow));
  }

  async getById(id: number): Promise<Fanfic | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_FULL)
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toFanfic(data as unknown as FanficRow) : null;
  }

  async create(input: FanficInput): Promise<Fanfic> {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert(toRow(input))
      .select('id')
      .single();
    if (error) throw error;

    const created = await this.getById((data as { id: number }).id);
    if (!created) throw new Error('No se pudo recuperar el fanfic recién creado.');
    return created;
  }

  async update(id: number, input: Partial<FanficInput>): Promise<Fanfic> {
    const patch = toRow(input);
    if (Object.keys(patch).length > 0) {
      const { error } = await this.supabase.from(this.table).update(patch).eq('id', id);
      if (error) throw error;
    }

    const updated = await this.getById(id);
    if (!updated) throw new Error('No se pudo recuperar el fanfic actualizado.');
    return updated;
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }
}
