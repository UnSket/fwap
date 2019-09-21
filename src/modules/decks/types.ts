import { Deck } from '../../model/types/Deck';

export type State = {
  loading: boolean,
  decks: Deck[],
  error?: string | null,
  page: number,
  last: boolean
};

export type Action = {}
