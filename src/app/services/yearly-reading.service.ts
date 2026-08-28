import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { YearlyReadingRow } from '../shared/models/supabase.types';
import { YearlyReading } from '@shared/models';

function toYearlyReading(row: YearlyReadingRow): YearlyReading {
  return {
    id: row.id,
    year: row.year,
    title: row.title,
    authors: row.authors ?? [],
    pages: row.pages,
    startDate: row.start_date,
    endDate: row.end_date,
    coverUrl: row.cover_url ?? '',
  };
}

export type YearlyReadingInput = Omit<YearlyReading, 'id'>;

function toRow(input: Partial<YearlyReadingInput>) {
  const row: Record<string, unknown> = {};
  if (input.year !== undefined) row['year'] = input.year;
  if (input.title !== undefined) row['title'] = input.title;
  if (input.authors !== undefined) row['authors'] = input.authors;
  if (input.pages !== undefined) row['pages'] = input.pages;
  if (input.startDate !== undefined) row['start_date'] = input.startDate;
  if (input.endDate !== undefined) row['end_date'] = input.endDate;
  if (input.coverUrl !== undefined) row['cover_url'] = input.coverUrl || null;
  return row;
}

@Injectable({ providedIn: 'root' })
export class YearlyReadingService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly table = 'yearly_readings';

  async getAll(): Promise<YearlyReading[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .order('year', { ascending: false })
      .order('start_date');
    if (error) throw error;
    return (data ?? []).map((row) => toYearlyReading(row as YearlyReadingRow));
  }

  async getByYear(year: number): Promise<YearlyReading[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .eq('year', year)
      .order('start_date');
    if (error) throw error;
    return (data ?? []).map((row) => toYearlyReading(row as YearlyReadingRow));
  }

  async getById(id: number): Promise<YearlyReading | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toYearlyReading(data as YearlyReadingRow) : null;
  }

  async create(input: YearlyReadingInput): Promise<YearlyReading> {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert(toRow(input))
      .select('*')
      .single();
    if (error) throw error;
    return toYearlyReading(data as YearlyReadingRow);
  }

  async update(id: number, input: Partial<YearlyReadingInput>): Promise<YearlyReading> {
    const { data, error } = await this.supabase
      .from(this.table)
      .update(toRow(input))
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return toYearlyReading(data as YearlyReadingRow);
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }
}