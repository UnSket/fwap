import { createActions } from 'redux-actions';

export const { saveFileRequest, saveFileSuccess, saveFileFailure } = createActions({
  SAVE_FILE_REQUEST: (files, deckId) => ({files, deckId}),
  SAVE_FILE_SUCCESS: (fileURL) => ({fileURL}),
  SAVE_FILE_FAILURE: (err) => ({err})
});
