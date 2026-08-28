import { LANGUAGE } from '@shared/constants';
import { READING_STATUS } from '../constants/reading-status.constant';
import { Editorial } from './editorial.interface';
import { Author } from './author.interface';

export interface Volume {
  id: number;
  title: string;
  authors: Author[];
  releaseDate: Date;
  coverImageUrl: string;
  readingStatus: READING_STATUS;
  adquisitionDate?: Date;
  startDate?: Date;
  finishDate?: Date;
  notes?: string;
  language: LANGUAGE;
  editorial: Editorial;
}
