import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { ReadingProgressRow } from '../shared/models/supabase.types';
import { ReadingProgress } from '@shared/models';

function toReadingProgress(row: ReadingProgressRow): ReadingProgress {
  return {
    id: row.id,
    readingId: row.reading_id,
    recordDate: row.record_date,
    page: row.page,
    percentage: row.percentage,
    pagesAdvanced: row.pages_advanced,
  };
}

export interface ReadingProgressInput {
  readingId: number;
  recordDate: string;
  /** Solo uno de los dos debe llegar informado: el otro se calcula a partir de `totalPages`. */
  page?: number;
  percentage?: number;
}

@Injectable({ providedIn: 'root' })
export class ReadingProgressService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly table = 'reading_progress';

  async getByReadingId(readingId: number): Promise<ReadingProgress[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .eq('reading_id', readingId)
      .order('record_date', { ascending: true })
      .order('id', { ascending: true });
    if (error) throw error;
    return (data ?? []).map((row) => toReadingProgress(row as ReadingProgressRow));
  }

  /**
   * Último porcentaje registrado para cada una de las lecturas indicadas (fila con
   * `record_date` más reciente y, a igualdad de fecha, `id` más alto). Se resuelve con
   * una única consulta en vez de N, ya que Supabase no da "último por grupo" sin una
   * función RPC dedicada; a esta escala de datos el filtrado en cliente es suficiente.
   */
  async getLatestPercentages(readingIds: number[]): Promise<Record<number, number>> {
    if (readingIds.length === 0) return {};
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .in('reading_id', readingIds)
      .order('record_date', { ascending: true })
      .order('id', { ascending: true });
    if (error) throw error;

    const result: Record<number, number> = {};
    for (const row of (data ?? []) as ReadingProgressRow[]) {
      result[row.reading_id] = row.percentage;
    }
    return result;
  }

  /** Suma de páginas avanzadas por día (todas las lecturas), para el mapa de calor de la home. */
  async getPagesByDay(fromDate: string): Promise<Record<string, number>> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('record_date, pages_advanced')
      .gte('record_date', fromDate);
    if (error) throw error;

    const result: Record<string, number> = {};
    for (const row of (data ?? []) as { record_date: string; pages_advanced: number }[]) {
      result[row.record_date] = (result[row.record_date] ?? 0) + row.pages_advanced;
    }
    return result;
  }

  async create(totalPages: number, input: ReadingProgressInput): Promise<ReadingProgress> {
    const { page, percentage } = this._resolvePageAndPercentage(totalPages, input);
    const { data, error } = await this.supabase
      .from(this.table)
      .insert({
        reading_id: input.readingId,
        record_date: input.recordDate,
        page,
        percentage,
        pages_advanced: 0, // se recalcula justo después junto al resto de la cadena
      })
      .select('*')
      .single();
    if (error) throw error;

    await this._recalculateChain(input.readingId);
    return (await this._getById((data as ReadingProgressRow).id))!;
  }

  async update(
    id: number,
    totalPages: number,
    input: ReadingProgressInput,
  ): Promise<ReadingProgress> {
    const { page, percentage } = this._resolvePageAndPercentage(totalPages, input);
    const { error } = await this.supabase
      .from(this.table)
      .update({ record_date: input.recordDate, page, percentage })
      .eq('id', id);
    if (error) throw error;

    await this._recalculateChain(input.readingId);
    return (await this._getById(id))!;
  }

  async remove(id: number): Promise<void> {
    const existing = await this._getById(id);
    if (!existing) return;
    const { error } = await this.supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
    await this._recalculateChain(existing.readingId);
  }

  private _resolvePageAndPercentage(
    totalPages: number,
    input: ReadingProgressInput,
  ): { page: number; percentage: number } {
    if (input.page != null) {
      const page = input.page;
      const percentage = totalPages > 0 ? Math.round((page / totalPages) * 10000) / 100 : 0;
      return { page, percentage };
    }
    if (input.percentage != null) {
      const percentage = input.percentage;
      const page = Math.round((percentage / 100) * totalPages);
      return { page, percentage };
    }
    throw new Error('Debe indicarse página o porcentaje.');
  }

  private async _recalculateChain(readingId: number): Promise<void> {
    const records = await this.getByReadingId(readingId);
    const updates: Promise<void>[] = [];
    let previousPage = 0;

    for (const record of records) {
      const pagesAdvanced = record.page - previousPage;

      if (pagesAdvanced !== record.pagesAdvanced) {
        updates.push(
          (async () => {
            const { error } = await this.supabase
              .from(this.table)
              .update({ pages_advanced: pagesAdvanced })
              .eq('id', record.id);

            if (error) throw error;
          })(),
        );
      }

      previousPage = record.page;
    }

    await Promise.all(updates);
  }

  private async _getById(id: number): Promise<ReadingProgress | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toReadingProgress(data as ReadingProgressRow) : null;
  }
}
