import { Fandom } from './fandom.interface';

export interface Ship {
  id: number;
  characters: string[];
  fandom: Fandom;
}
