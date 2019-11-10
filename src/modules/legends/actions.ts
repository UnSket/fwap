import { createActions } from 'redux-actions';

export const {
  getDeckLegendsRequest,
  getDeckLegendsSuccess,
  legendsFailure,
  createLegendRequest,
  gotLegend,
  setLegendImageTextRequest,
  updateLegendRequest
} = createActions({
  GET_DECK_LEGENDS_REQUEST: (deckId) => ({deckId}),
  GET_DECK_LEGENDS_SUCCESS: (legends) => ({legends}),
  LEGENDS_FAILURE: (error) => ({error}),
  CREATE_LEGEND_REQUEST: (deckId, name) => ({deckId, name}),
  GOT_LEGEND: (legend) => ({legend}),
  SET_LEGEND_IMAGE_TEXT_REQUEST: (legendId, imageId, text) => ({legendId, imageId, text}),
  UPDATE_LEGEND_REQUEST: (cards, legendId, textSize) => ({cards, legendId, textSize})
});
