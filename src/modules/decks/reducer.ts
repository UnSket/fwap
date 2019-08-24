import { combineActions, handleActions } from 'redux-actions';
import { deckFailure, createDeckRequest, createDeckSuccess, getDeckRequest, getDeckSuccess, getDecksRequest, getDecksSuccess, updateDeckRequest } from './actions';
import { saveFileRequest, saveFileSuccess, saveFileFailure, updateImageRequest, updateImageSuccess } from './files/actions';
import { State } from './types';
import keyBy from 'lodash/keyBy';
import { Image } from '../../model/types/Image';

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
    [combineActions(createDeckRequest, getDeckRequest, getDecksRequest, updateDeckRequest).toString()]: state => ({...state, loading: true, createdDeckId: null, error: null}),
    [deckFailure.toString()]: (state, {payload: {error}}) => ({...state, loading: false, createdDeckId: null, error}),
    [createDeckSuccess.toString()]: (state, {payload: {deck} }) => ({...state, decksById: {...state.decksById, [deck.id]: deck}, loading: false, createdDeckId: deck.id}),
    [getDeckSuccess.toString()]: (state, {payload: {deck} }) => ({...state, decksById: {...state.decksById, [deck.id]: deck}, loading: false}),
    [getDecksSuccess.toString()]: (state, {payload: {decks} }) => {
      const decksById = keyBy(decks, 'id');
      return ({...state, decksById: {...state.decksById, ...decksById}, loading: false})
    },
    [combineActions(saveFileRequest, updateImageRequest).toString()]: (state) => ({...state, files: {loading: true, error: null}}),
    [saveFileFailure.toString()]: (state, {payload: {error}}) => ({...state, files: {loading: false, error}}),
    [saveFileSuccess.toString()]: (state, {payload: {images, deckId}}) => {
      const currentDeck = state.decksById[deckId];
      currentDeck.images = currentDeck.images.concat(images);
      return ({
        ...state,
        decksById: {
          ...state.decksById,
          [deckId]: currentDeck
        }
      })
    },
    [updateImageSuccess.toString()]: (state, {payload: {newImage, deckId}}) => {
      const currentDeck = state.decksById[deckId];
      const currentImageIndex = currentDeck.images.findIndex((image: Image) => image.id === newImage.id);
      currentDeck.images[currentImageIndex] = newImage;
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
