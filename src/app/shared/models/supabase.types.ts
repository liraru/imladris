import { LANGUAGE } from '@shared/constants';
import { GENRE, DEMOGRAPHIC } from '../constants/categories.constant';
import { COUNTRY } from '../constants/countries.constant';
import { READING_STATUS } from '../constants/reading-status.constant';

/**
 * Tipos "crudos" tal y como los devuelve/espera Supabase (columnas en snake_case).
 * Los servicios de src/app/shared/services se encargan de mapear estos tipos
 * a/desde las interfaces de dominio de src/app/shared/models.
 */

export interface EditorialRow {
  id: number;
  name: string;
  country: COUNTRY;
  website: string | null;
  logo: string | null;
}

export interface AuthorRow {
  id: number;
  name: string;
  country: COUNTRY;
  notes: string | null;
}

export interface BookSerieRow {
  id: number;
  title: string;
  editorial_id: number;
  editorial?: EditorialRow;
}

export interface BookRow {
  id: number;
  title: string;
  reading_status: READING_STATUS;
  release_date: string | null;
  cover_image_url: string | null;
  adquisition_date: string | null;
  start_date: string | null;
  finish_date: string | null;
  notes: string | null;
  language: LANGUAGE;
  editorial_id: number;
  serie_id: number | null;
  serie_volume: number | null;
  editorial?: EditorialRow;
  serie?: BookSerieRow | null;
  book_authors?: { author: AuthorRow }[];
  book_genres?: { genre: GENRE }[];
}

export interface MangaRow {
  id: number;
  title: string;
  demographic: DEMOGRAPHIC;
  manga_authors?: { author: AuthorRow }[];
  manga_genres?: { genre: GENRE }[];
}

export interface MangaVolumeRow {
  id: number;
  title: string;
  manga_id: number;
  volume_number: number;
  reading_status: READING_STATUS;
  release_date: string | null;
  cover_image_url: string | null;
  adquisition_date: string | null;
  start_date: string | null;
  finish_date: string | null;
  notes: string | null;
  language: LANGUAGE;
  editorial_id: number;
  editorial?: EditorialRow;
  manga_volume_authors?: { author: AuthorRow }[];
}

export interface YearlyReadingRow {
  id: number;
  year: number;
  title: string;
  authors: string[];
  pages: number;
  start_date: string;
  end_date: string;
  cover_url: string | null;
}