import { State as UserDecksState } from './userDecks/types';
import { State as UserState } from './user/types';
import { State as UsersState } from './users/types';
import { State as DecksState } from './decks/types';
import { RouteComponentProps } from 'react-router';
import { State as LegendsState } from './legends/types';

export type StoreState = {
  userDecks: UserDecksState,
  user: UserState,
  router: RouteComponentProps<any>,
  users: UsersState,
  decks: DecksState,
  legends: LegendsState
}
