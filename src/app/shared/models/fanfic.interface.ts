import { LANGUAGE } from '../constants/languages.constant';
import { RATING } from '../constants/rating.constant';
import { READING_STATUS } from '../constants/reading-status.constant';
import { Fandom } from './fandom.interface';
import { Ship } from './ship.interface';

export interface Fanfic {
  id: number;
  title: string;
  authors: string[];
  fandom: Fandom;
  ship: Ship;
  rating: RATING;
  words: number;
  chapters: number;
  pages?: number;
  readingStatus: READING_STATUS; // default: READING_STATUS.NOT_STARTED
  releaseDate?: string; // yyyy-mm-dd
  adquisitionDate?: string; // yyyy-mm-dd
  startDate?: string; // yyyy-mm-dd
  finishDate?: string; // yyyy-mm-dd
  triggerWarnings?: string[];
  language: LANGUAGE;
  tags?: string[];
  summary?: string;
  fileUrl?: string;
  originalUrl?: string;
  coverUrl?: string;
  notes?: string;
}
