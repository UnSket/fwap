import { Deck } from '../../model/types/Deck';

export type State = {
  loading: boolean,
  decksById: any,
  createdDeckId: number | null,
  error?: string | null,
  files: {
    loading: boolean,
    error: string | null
  }
};

export type Action = {
  deck?: Deck;
  error?: string;
  decks?: Deck[]
}
