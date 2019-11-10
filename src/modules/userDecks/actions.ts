import { createActions } from 'redux-actions';

// deck actions
export const {
  createDeckRequest,
  createDeckSuccess,
  deckFailure,
  getDeckRequest,
  getDeckSuccess,
  getUserDecksRequest,
  getUserDecksSuccess,
  updateDeckRequest,
} = createActions({
  CREATE_DECK_REQUEST: (deck) => ({deck}),
  CREATE_DECK_SUCCESS: (deck) => ({deck}),
  DECK_FAILURE: (error) => ({error}),
  GET_DECK_REQUEST: (id) => ({id}),
  GET_DECK_SUCCESS: (deck) => ({deck}),
  GET_USER_DECKS_REQUEST: () => null,
  GET_USER_DECKS_SUCCESS: (decks) => ({decks}),
  UPDATE_DECK_REQUEST: (deckId, name, description, isNumerated) => ({deckId, name, description, isNumerated}),
});

// cards actions
export const {
  getDeckCardsRequest,
  getDeckCardsSuccess,
  getDeckCardsFailure,
  saveCardsRequest,
} = createActions({
  GET_DECK_CARDS_REQUEST: (deckId) => ({deckId}),
  GET_DECK_CARDS_SUCCESS: (deckId, cards) => ({deckId, cards}),
  GET_DECK_CARDS_FAILURE: (error) => ({error}),
  SAVE_CARDS_REQUEST: (cards, deckId) => ({cards, deckId}),
});
