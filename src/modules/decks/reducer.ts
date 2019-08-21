import { combineActions, handleActions } from 'redux-actions';
import { deckFailure, createDeckRequest, createDeckSuccess, getDeckRequest, getDeckSuccess } from './actions';
import { State, Action } from './types';
import { combineReducers } from 'redux';

const defaultState: State = {
  loading: false,
  decksById: {},
  createdDeckId: null
};

export default handleActions<State, Action>(
  {
    [combineActions(createDeckRequest, getDeckRequest).toString()]: state => ({...state, loading: true, createdDeckId: null, error: null}),
    [deckFailure.toString()]: (state, {payload: {error}}) => ({...state, loading: false, createdDeckId: null, error}),
    [createDeckSuccess.toString()]: (state, {payload: {deck} }) => ({decksById: {...state.decksById, [deck.id]: deck}, loading: false, createdDeckId: deck.id}),
    [getDeckSuccess.toString()]: (state, {payload: {deck} }) => ({...state, decksById: {...state.decksById, [deck.id]: deck}, loading: false}),
  },
  defaultState
);
