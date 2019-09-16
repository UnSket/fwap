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
  getDeckCardsRequest,
  saveCardsRequest,
  saveLegendRequest,
  saveImageSuccess,
  getDeckLegendRequest,
  saveLegendCardsRequest,
  changeLegendTextSizeRequest
} = createActions({
  CREATE_DECK_REQUEST: (deck) => ({deck}),
  CREATE_DECK_SUCCESS: (deck) => ({deck}),
  DECK_FAILURE: (error) => ({error}),
  GET_DECK_REQUEST: (id) => ({id}),
  GET_DECK_SUCCESS: (deck) => ({deck}),
  GET_DECKS_REQUEST: () => null,
  GET_DECKS_SUCCESS: (decks) => ({decks}),
  UPDATE_DECK_REQUEST: (deckId, name, description) => ({deckId, name, description}),
  GET_DECK_CARDS_REQUEST: (deckId) => ({deckId}),
  SAVE_CARDS_REQUEST: (cards, deckId) => ({cards, deckId}),
  SAVE_LEGEND_REQUEST: (image, deckId) => ({image, deckId}),
  SAVE_IMAGE_SUCCESS: (deckId, image) => ({deckId, newImage: image}),
  GET_DECK_LEGEND_REQUEST: (deckId) => ({deckId}),
  SAVE_LEGEND_CARDS_REQUEST: (cards, deckId) => ({cards, deckId}),
  CHANGE_LEGEND_TEXT_SIZE_REQUEST: (textSize, deckId) => ({textSize, deckId})
});
