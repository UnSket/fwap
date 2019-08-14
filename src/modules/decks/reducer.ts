import { handleActions } from 'redux-actions';
import { createDeckFailure, createDeckRequest, createDeckSuccess } from './actions';
import { State, Action } from './types';

const defaultState: State = {
  loading: false,
  decksById: {},
  createdDeckId: null
};

export default handleActions<State, Action>(
  {
    [createDeckRequest.toString()]: state => ({...state, loading: true, createdDeckId: null, error: null}),
    [createDeckFailure.toString()]: (state, {payload: {error}}) => ({...state, loading: false, createdDeckId: null, error}),
    [createDeckSuccess.toString()]: (state, {payload: {deck} }) => ({decksById: {...state.decksById, [deck.id]: deck}, loading: false, createdDeckId: deck.id})
  },
  defaultState
);
