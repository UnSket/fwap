import { Deck } from '../../model/types/Deck';

export type State = {
  loading: boolean,
  decksById: {
    [key: string]: Deck
  },
  createdDeckId: number | null,
  error?: string | null,
  files: {
    loading: boolean,
    error?: string | null
  },
  cards: {
    loading: boolean,
    error?: string | null
  },
  legend: {
    loading: boolean,
    error?: string | null
  }
};

export type Action = {
  deck?: Deck;
  error?: string;
  decks?: Deck[]
}
