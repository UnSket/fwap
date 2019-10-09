import { combineActions, handleActions } from 'redux-actions';
import {
  deckFailure,
  createDeckRequest,
  createDeckSuccess,
  getDeckRequest,
  getDeckSuccess,
  getUserDecksRequest,
  getUserDecksSuccess,
  updateDeckRequest,
  getDeckCardsRequest,
  saveImageTextSuccess,
  getDeckLegendRequest,
  saveLegendCardsRequest,
  getDeckCardsSuccess,
  getDeckCardsFailure,
  legendFailure,
  getDeckLegendSuccess,
  saveImageTextRequest,
  saveCardsRequest
} from './actions';
import { saveFileRequest, saveFileSuccess, saveFileFailure, updateImageRequest, updateImageSuccess } from './files/actions';
import { State } from './types';
import keyBy from 'lodash/keyBy';
import { Image } from '../../model/types/Image';
import cloneDeep from 'lodash/cloneDeep';
import groupBy from 'lodash/groupBy';
import { LegendSourceTypeEnum } from '../../model/types/Legend';

const defaultState: State = {
  loading: false,
  decksById: {},
  createdDeckId: null,
  files: {
    loading: false
  },
  cards: {
    loading: false
  },
  legend: {
    loading: false
  }
};

export default handleActions<State, any>(
  {
    [combineActions(
      createDeckRequest,
      getDeckRequest,
      getUserDecksRequest,
      updateDeckRequest,
    ).toString()]: state => ({...state, loading: true, createdDeckId: null, error: null}),
    [deckFailure.toString()]: (state, {payload: {error}}) => ({...state, loading: false, createdDeckId: null, error}),
    [createDeckSuccess.toString()]: (state, {payload: {deck} }) => ({...state, decksById: {...state.decksById, [deck.id]: deck}, loading: false, createdDeckId: deck.id}),
    [getDeckSuccess.toString()]: (state, {payload: {deck} }) => ({...state, decksById: {...state.decksById, [deck.id]: deck}, loading: false}),
    [getUserDecksSuccess.toString()]: (state, {payload: {decks} }) => {
      const decksById = keyBy(decks, 'id');
      return ({...state, decksById: {...state.decksById, ...decksById}, loading: false})
    },
    [combineActions(saveFileRequest, updateImageRequest).toString()]: (state) => ({...state, files: {loading: true, error: null}}),
    [saveFileFailure.toString()]: (state, {payload: {error}}) => ({...state, files: {loading: false, error}}),
    [saveFileSuccess.toString()]: (state, {payload: {images, deckId}}) => {
      const currentDeck = state.decksById[deckId];
      currentDeck.images = currentDeck.images.concat(images);
      currentDeck.imagesRequired = currentDeck.imagesRequired - images.length;
      return ({
        ...state,
        decksById: {
          ...state.decksById,
          [deckId]: currentDeck
        },
        files: {
          loading: false
        }
      })
    },
    [combineActions(saveImageTextSuccess, updateImageSuccess).toString()]: (state, {payload: {newImage, deckId}}) => {
      const currentDeck = state.decksById[deckId];
      const currentImageIndex = currentDeck.images.findIndex((image: Image) => newImage.id === image.id);
      currentDeck.images = [...currentDeck.images.slice(0, currentImageIndex), newImage, ...currentDeck.images.slice(currentImageIndex + 1)];
      if (currentDeck && currentDeck.legend) {
        const legendCopy = cloneDeep(currentDeck.legend);
        const legendItems = legendCopy.cards.flat();
        const itemTextIndex = legendItems.findIndex(item => item.imageId === newImage.id && item.legendSourceType === LegendSourceTypeEnum.text);
        legendItems[itemTextIndex].source = newImage.text || '';
        legendItems[itemTextIndex].source = newImage.text || '';
        const itemImageIndex = legendItems.findIndex(item => item.imageId === newImage.id && item.legendSourceType === LegendSourceTypeEnum.image);
        legendItems[itemImageIndex].source = newImage.url;
        const itemsByCardsNumber = groupBy(legendItems, 'cardNumber');
        legendCopy.cards = Object.values(itemsByCardsNumber);
        currentDeck.legend = legendCopy;
      }
      return ({
        ...state,
        decksById: {
          ...state.decksById,
          [deckId]: currentDeck
        },
        files: {
          loading: false
        }
      })
    },
    [combineActions(getDeckCardsRequest, saveCardsRequest).toString()]: (state) => ({...state, cards: {loading: true, error: null}}),
    [getDeckCardsFailure.toString()]: (state, {payload: {error}}) => ({...state, cards: {loading: false, error: error.toString()}}),
    [getDeckCardsSuccess.toString()]: (state, {payload: {deckId, cards}}) => {
      if (!cards.length) {
        return state;
      }
      const currentDeck = cloneDeep(state.decksById[deckId]!);
      currentDeck.cards = cards;
      return {
        ...state,
        decksById: {
          ...state.decksById,
          [deckId]: currentDeck
        },
        cards:  {
          loading: false,
          error: null
        }
      }
    },
    [combineActions(saveLegendCardsRequest, getDeckLegendRequest).toString()]: (state) => ({...state, legend: {loading: true, error: null}}),
    [legendFailure.toString()]: (state, {payload: {error}}) => ({...state, legend: {loading: false, error: error.toString()}}),
    [getDeckLegendSuccess.toString()]: (state, {payload: {deckId, legend}}) => {
      const currentDeck = cloneDeep(state.decksById[deckId]!);
      currentDeck.legend = legend;
      currentDeck.legendTuned = legend.legendTuned;
      return {
        ...state,
        decksById: {
          ...state.decksById,
          [deckId]: currentDeck
        },
        legend:  {
          loading: false,
          error: null
        }
      }
    }
  },
  defaultState
);
