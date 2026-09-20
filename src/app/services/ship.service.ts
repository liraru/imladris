import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { FandomRow, ShipRow } from '../shared/models/supabase.types';
import { Ship } from '@shared/models';

const SELECT_WITH_FANDOM = '*, fandom:fandoms(*)';

function toShip(row: ShipRow): Ship {
  const fandom = row.fandom as FandomRow;
  return {
    id: row.id,
    characters: row.characters ?? [],
    fandom: { id: fandom.id, name: fandom.name, origin: fandom.origin },
  };
}

export interface ShipInput {
  characters: string[];
  fandomId: number;
}

function toRow(input: Partial<ShipInput>) {
  const row: Record<string, unknown> = {};
  if (input.characters !== undefined) row['characters'] = input.characters;
  if (input.fandomId !== undefined) row['fandom_id'] = input.fandomId;
  return row;
}

@Injectable({ providedIn: 'root' })
export class ShipService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly table = 'ships';

  async getAll(): Promise<Ship[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_WITH_FANDOM)
      .order('id');
    if (error) throw error;
    return (data ?? []).map((row) => toShip(row as unknown as ShipRow));
  }

  async getByFandom(fandomId: number): Promise<Ship[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_WITH_FANDOM)
      .eq('fandom_id', fandomId)
      .order('id');
    if (error) throw error;
    return (data ?? []).map((row) => toShip(row as unknown as ShipRow));
  }

  async getById(id: number): Promise<Ship | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_WITH_FANDOM)
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toShip(data as unknown as ShipRow) : null;
  }

  async create(input: ShipInput): Promise<Ship> {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert(toRow(input))
      .select(SELECT_WITH_FANDOM)
      .single();
    if (error) throw error;
    return toShip(data as unknown as ShipRow);
  }

  async update(id: number, input: Partial<ShipInput>): Promise<Ship> {
    const { data, error } = await this.supabase
      .from(this.table)
      .update(toRow(input))
      .eq('id', id)
      .select(SELECT_WITH_FANDOM)
      .single();
    if (error) throw error;
    return toShip(data as unknown as ShipRow);
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }

  /** Ids de ships referenciados desde fanfics (para no permitir borrarlos). */
  async getUsedIds(): Promise<Set<number>> {
    const { data, error } = await this.supabase.from('fanfics').select('ship_id');
    if (error) throw error;
    return new Set((data ?? []).map((row) => (row as { ship_id: number }).ship_id));
  }
}
