import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { BookRow, EditorialRow, BookSerieRow } from '../shared/models/supabase.types';
import { Book } from '@shared/models';
import { GENRE } from '../shared/constants/categories.constant';

const SELECT_FULL = `
  *,
  editorial:editorials(*),
  serie:book_series(*, editorial:editorials(*)),
  book_authors(author:authors(*)),
  book_genres(genre)
`;

function toBook(row: BookRow): Book {
  const editorial = row.editorial as EditorialRow;
  const serie = row.serie as BookSerieRow | null | undefined;

  return {
    id: row.id,
    title: row.title,
    authors: (row.book_authors ?? []).map(({ author }) => ({
      id: author.id,
      name: author.name,
      country: author.country,
      notes: author.notes ?? undefined,
    })),
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
    serie:
      serie != null
        ? {
            id: serie.id,
            title: serie.title,
            editorial: {
              id: (serie.editorial as EditorialRow).id,
              name: (serie.editorial as EditorialRow).name,
              country: (serie.editorial as EditorialRow).country,
              website: (serie.editorial as EditorialRow).website ?? undefined,
              logo: (serie.editorial as EditorialRow).logo ?? undefined,
            },
          }
        : undefined,
    serieVolume: row.serie_volume ?? undefined,
    genres: (row.book_genres ?? []).map(({ genre }) => genre),
  };
}

/** Datos necesarios para crear/editar un libro, en forma "plana" (ids en vez de objetos). */
export interface BookInput {
  title: string;
  authorIds: number[];
  readingStatus: Book['readingStatus'];
  releaseDate?: Date;
  coverImageUrl?: string;
  adquisitionDate?: Date;
  startDate?: Date;
  finishDate?: Date;
  notes?: string;
  language: Book['language'];
  editorialId: number;
  serieId?: number;
  serieVolume?: number;
  genres: GENRE[];
}

function toDateString(date?: Date): string | null {
  return date ? date.toISOString().slice(0, 10) : null;
}

function toRow(input: Partial<BookInput>) {
  const row: Record<string, unknown> = {};
  if (input.title !== undefined) row['title'] = input.title;
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
  if (input.serieId !== undefined) row['serie_id'] = input.serieId ?? null;
  if (input.serieVolume !== undefined) row['serie_volume'] = input.serieVolume ?? null;
  return row;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly table = 'books';

  async getAll(): Promise<Book[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_FULL)
      .order('title');
    if (error) throw error;
    return (data ?? []).map((row) => toBook(row as unknown as BookRow));
  }

  async getById(id: number): Promise<Book | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select(SELECT_FULL)
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toBook(data as unknown as BookRow) : null;
  }

  async create(input: BookInput): Promise<Book> {
    const { data: inserted, error } = await this.supabase
      .from(this.table)
      .insert(toRow(input))
      .select('id')
      .single();
    if (error) throw error;

    const bookId = (inserted as { id: number }).id;
    await this.syncAuthors(bookId, input.authorIds);
    await this.syncGenres(bookId, input.genres);

    const created = await this.getById(bookId);
    if (!created) throw new Error('No se pudo recuperar el libro recién creado.');
    return created;
  }

  async update(id: number, input: Partial<BookInput>): Promise<Book> {
    const patch = toRow(input);
    if (Object.keys(patch).length > 0) {
      const { error } = await this.supabase.from(this.table).update(patch).eq('id', id);
      if (error) throw error;
    }

    if (input.authorIds !== undefined) await this.syncAuthors(id, input.authorIds);
    if (input.genres !== undefined) await this.syncGenres(id, input.genres);

    const updated = await this.getById(id);
    if (!updated) throw new Error('No se pudo recuperar el libro actualizado.');
    return updated;
  }

  async remove(id: number): Promise<void> {
    // book_authors y book_genres se borran en cascada (on delete cascade).
    const { error } = await this.supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }

  private async syncAuthors(bookId: number, authorIds: number[]): Promise<void> {
    const { error: deleteError } = await this.supabase
      .from('book_authors')
      .delete()
      .eq('book_id', bookId);
    if (deleteError) throw deleteError;

    if (authorIds.length === 0) return;

    const { error: insertError } = await this.supabase
      .from('book_authors')
      .insert(authorIds.map((authorId) => ({ book_id: bookId, author_id: authorId })));
    if (insertError) throw insertError;
  }

  private async syncGenres(bookId: number, genres: GENRE[]): Promise<void> {
    const { error: deleteError } = await this.supabase
      .from('book_genres')
      .delete()
      .eq('book_id', bookId);
    if (deleteError) throw deleteError;

    if (genres.length === 0) return;

    const { error: insertError } = await this.supabase
      .from('book_genres')
      .insert(genres.map((genre) => ({ book_id: bookId, genre })));
    if (insertError) throw insertError;
  }
}
