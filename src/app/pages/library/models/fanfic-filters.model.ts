import { READING_STATUS } from '@shared/constants';
import { RATING } from '@shared/constants';
import {
  DEFAULT_FANFIC_SORT,
  DEFAULT_FANFIC_SORT_DIRECTION,
  FANFIC_SORT_FIELD,
} from '../constants/fanfic.constants';
import { MODE } from '../constants/library.constants';

export interface FanficFilters {
  mode: MODE;
  title: string;
  fandomId: number | null;
  rating: RATING | null;
  readingStatus: READING_STATUS | null;
  sortBy: FANFIC_SORT_FIELD;
  sortDirection: 'asc' | 'desc';
}

export const DEFAULT_FANFIC_FILTERS: FanficFilters = {
  mode: MODE.GALLERY,
  title: '',
  fandomId: null,
  rating: null,
  readingStatus: null,
  sortBy: DEFAULT_FANFIC_SORT,
  sortDirection: DEFAULT_FANFIC_SORT_DIRECTION,
};
