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
  saveImageSuccess,
} = createActions({
  CREATE_DECK_REQUEST: (deck) => ({deck}),
  CREATE_DECK_SUCCESS: (deck) => ({deck}),
  DECK_FAILURE: (error) => ({error}),
  GET_DECK_REQUEST: (id) => ({id}),
  GET_DECK_SUCCESS: (deck) => ({deck}),
  GET_USER_DECKS_REQUEST: () => null,
  GET_USER_DECKS_SUCCESS: (decks) => ({decks}),
  UPDATE_DECK_REQUEST: (deckId, name, description) => ({deckId, name, description}),
  SAVE_IMAGE_SUCCESS: (deckId, image) => ({deckId, newImage: image}),
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

// legend actions
export const {
  saveLegendRequest,
  getDeckLegendRequest,
  getDeckLegendSuccess,
  legendFailure,
  saveLegendCardsRequest
} = createActions({
  SAVE_LEGEND_REQUEST: (image, deckId) => ({image, deckId}),
  GET_DECK_LEGEND_REQUEST: (deckId) => ({deckId}),
  GET_DECK_LEGEND_SUCCESS: (deckId, legend) => ({deckId, legend}),
  LEGEND_FAILURE: (error) => ({error}),
  SAVE_LEGEND_CARDS_REQUEST: (cards, deckId, textSize) => ({cards, deckId, textSize})
});
