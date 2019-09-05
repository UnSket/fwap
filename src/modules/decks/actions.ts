import { createActions } from 'redux-actions';

export const {
  createDeckRequest,
  createDeckSuccess,
  deckFailure,
  getDeckRequest,
  getDeckSuccess,
  getDecksRequest,
  getDecksSuccess,
  updateDeckRequest,
  getDeckCardsRequest
} = createActions({
  CREATE_DECK_REQUEST: (deck) => ({deck}),
  CREATE_DECK_SUCCESS: (deck) => ({deck}),
  DECK_FAILURE: (error) => ({error}),
  GET_DECK_REQUEST: (id) => ({id}),
  GET_DECK_SUCCESS: (deck) => ({deck}),
  GET_DECKS_REQUEST: () => null,
  GET_DECKS_SUCCESS: (decks) => ({decks}),
  UPDATE_DECK_REQUEST: (deckId, name, description) => ({deckId, name, description}),
  GET_DECK_CARDS_REQUEST: (deckId) => ({deckId})
});
