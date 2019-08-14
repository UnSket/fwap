import { State as AppState } from './app/types';
import { State as DecksState } from './decks/types';
import { State as UserState } from './decks/types';

export type StoreState = {
  app: AppState,
  decks: DecksState,
  user: UserState
}
