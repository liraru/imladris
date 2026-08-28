import { LANGUAGE } from '@shared/constants';
import { READING_STATUS } from '../constants/reading-status.constant';
import { Editorial } from './editorial.interface';
import { Author } from './author.interface';

export interface Volume {
  id: number;
  title: string;
  authors: Author[];
  readingStatus: READING_STATUS; // default: READING_STATUS.NOT_STARTED
  releaseDate?: Date;
  coverImageUrl?: string;
  adquisitionDate?: Date;
  startDate?: Date;
  finishDate?: Date;
  notes?: string;
  language: LANGUAGE;
  editorial: Editorial;
}
