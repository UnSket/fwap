import { combineActions, handleActions } from 'redux-actions';
import { deckFailure, createDeckRequest, createDeckSuccess, getDeckRequest, getDeckSuccess, getDecksRequest, getDecksSuccess } from './actions';
import { saveFileRequest, saveFileSuccess, saveFileFailure  } from './files/actions';
import { State } from './types';
import keyBy from 'lodash/keyBy';

const defaultState: State = {
  loading: false,
  decksById: {},
  createdDeckId: null,
  files: {
    loading: false,
    error: null
  }
};

export default handleActions<State, any>(
  {
    [combineActions(createDeckRequest, getDeckRequest, getDecksRequest).toString()]: state => ({...state, loading: true, createdDeckId: null, error: null}),
    [deckFailure.toString()]: (state, {payload: {error}}) => ({...state, loading: false, createdDeckId: null, error}),
    [createDeckSuccess.toString()]: (state, {payload: {deck} }) => ({...state, decksById: {...state.decksById, [deck.id]: deck}, loading: false, createdDeckId: deck.id}),
    [getDeckSuccess.toString()]: (state, {payload: {deck} }) => ({...state, decksById: {...state.decksById, [deck.id]: deck}, loading: false}),
    [getDecksSuccess.toString()]: (state, {payload: {decks} }) => {
      const decksById = keyBy(decks, 'id');
      return ({...state, decksById: {...state.decksById, ...decksById}, loading: false})
    },
    [saveFileRequest.toString()]: (state) => ({...state, files: {loading: true, error: null}}),
    [saveFileFailure.toString()]: (state, {payload: {error}}) => ({...state, files: {loading: false, error}}),
    [saveFileSuccess.toString()]: (state, {payload: {images, deckId}}) => {
      const currentDeck = state.decksById[deckId];
      console.log(images, deckId);
      currentDeck.images = currentDeck.images.concat(images);
      return ({
        ...state,
        decksById: {
          ...state.decksById,
          [deckId]: currentDeck
        }
      })
    }
  },
  defaultState
);
