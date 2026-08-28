import { LANGUAGE } from '@shared/constants';
import { READING_STATUS } from '../constants/reading-status.constant';
import { Editorial } from './editorial.interface';
import { Author } from './author.interface';

export interface Volume {
  id: number;
  title: string;
  authors: Author[];
  readingStatus: READING_STATUS; // default: READING_STATUS.NOT_STARTED
  releaseDate?: string; // yyyy-mm-dd
  coverImageUrl?: string;
  adquisitionDate?: string; // yyyy-mm-dd
  startDate?: string; // yyyy-mm-dd
  finishDate?: string; // yyyy-mm-dd
  notes?: string;
  language: LANGUAGE;
  editorial: Editorial;
}
