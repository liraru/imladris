import { READING_STATUS } from '@shared/constants';
import {
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIRECTION,
  MODE,
  SORT_FIELD,
  TYPE,
} from '../constants/library.consants';

export interface LibraryFilters {
  mode: MODE;
  type: TYPE;
  title: string;
  authorId: number | null;
  serieId: number | null;
  finishYear: number | null;
  adquisitionYear: number | null;
  editorialId: number | null;
  readingStatus: READING_STATUS | null;
  sortBy: SORT_FIELD[];
  sortDirection: 'asc' | 'desc';
}

export const DEFAULT_LIBRARY_FILTERS: LibraryFilters = {
  mode: MODE.GALLERY,
  type: TYPE.BOOK,
  title: '',
  authorId: null,
  serieId: null,
  finishYear: null,
  adquisitionYear: null,
  editorialId: null,
  readingStatus: null,
  sortBy: DEFAULT_SORT_BY[TYPE.BOOK],
  sortDirection: DEFAULT_SORT_DIRECTION,
};
