import { Deck } from '../../model/types/Deck';
import { Legend } from '../../model/types/Legend';

export type State = {
  loading: boolean,
  legendsById: {
    [legendId: string]: Legend
  },
  error?: string | null,
};
