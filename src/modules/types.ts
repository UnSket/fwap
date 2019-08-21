import { State as AppState } from './app/types';
import { State as DecksState } from './decks/types';
import { State as UserState } from './decks/types';
import { RouteComponentProps } from 'react-router';

export type StoreState = {
  app: AppState,
  decks: DecksState,
  user: UserState,
  router: RouteComponentProps<any>
}
