import { createActions } from 'redux-actions';

export const { saveFileRequest, saveFileSuccess, saveFileFailure } = createActions({
  SAVE_FILE_REQUEST: (files, deckId) => ({files, deckId}),
  SAVE_FILE_SUCCESS: (images, deckId) => ({images, deckId}),
  SAVE_FILE_FAILURE: (error) => ({error})
});
