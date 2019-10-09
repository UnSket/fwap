import { createActions } from 'redux-actions';

export const { saveFileRequest, saveFileSuccess, saveFileFailure, updateImageRequest, updateImageSuccess, updateBacksideRequest } = createActions({
  SAVE_FILE_REQUEST: (files, deckId, bgCleanUpFlags) => ({files, deckId, bgCleanUpFlags}),
  SAVE_FILE_SUCCESS: (images, deckId) => ({images, deckId}),
  SAVE_FILE_FAILURE: (error) => ({error}),
  UPDATE_IMAGE_REQUEST: (image, file, deckId, bgCleanUpFlags) => ({image, file, deckId, bgCleanUpFlags}),
  UPDATE_IMAGE_SUCCESS: (newImage, deckId) => ({newImage, deckId}),
  UPDATE_BACKSIDE_REQUEST: (image, deckId, bgCleanUpFlags) => ({image, deckId, bgCleanUpFlags})
});
