import { createActions } from 'redux-actions';

export const { createDeckRequest, createDeckSuccess, deckFailure, getDeckRequest, getDeckSuccess } = createActions({
  CREATE_DECK_REQUEST: (deck) => ({deck}),
  CREATE_DECK_SUCCESS: (deck) => ({deck}),
  DECK_FAILURE: (error) => ({error}),
  GET_DECK_REQUEST: (id) => ({id}),
  GET_DECK_SUCCESS: (deck) => ({deck})
});
