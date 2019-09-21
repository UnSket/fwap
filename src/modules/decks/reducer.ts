import { handleActions } from 'redux-actions';
import { State } from './types';
import { getDecksFailed, getDecksSuccess, getDecksRequest } from './actions';
import { Pageable } from '../../model/types/Pageable';
import { Deck } from '../../model/types/Deck';
const defaultState: State = {
  loading: false,
  page: -1,
  decks: [],
  last: false
};

export default handleActions<State, any>(
  {
    [getDecksRequest.toString()]: (state) => ({...state, loading: true, error: null}),
    [getDecksFailed.toString()]: (state, {payload: {error}}) => ({...state, loading: false, error}),
    [getDecksSuccess.toString()]: (state, {payload: {page, reset}}: {payload: {page: Pageable<Deck>, reset?: boolean}}) => {
      if (reset) {
        return {
          decks: [...page.content],
          page: page.number,
          loading: false,
          last: page.last
        };
      }
      if (page.number > state.page) {
        return {
          decks: [...state.decks, ...page.content],
          page: page.number,
          loading: false,
          last: page.last
        }
      }
      return state;
    }
  },
  defaultState
);
