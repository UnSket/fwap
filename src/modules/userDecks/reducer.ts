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
  getDeckCardsSuccess,
  getDeckCardsFailure,
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
    [combineActions(updateImageSuccess).toString()]: (state, {payload: {newImage, deckId}}) => {
      const currentDeck = state.decksById[deckId];
      const currentImageIndex = currentDeck.images.findIndex((image: Image) => newImage.id === image.id);
      currentDeck.images = [...currentDeck.images.slice(0, currentImageIndex), newImage, ...currentDeck.images.slice(currentImageIndex + 1)];
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
    }
  },
  defaultState
);
