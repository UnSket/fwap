import { createActions } from 'redux-actions';

export const {
  getDecksRequest,
  getDecksSuccess,
  getDecksFailed,
} = createActions({
  GET_DECKS_REQUEST: (pageNumber: number, search?: string, reset?: boolean) => ({pageNumber, search, reset}),
  GET_DECKS_SUCCESS: (page, reset) => ({ page, reset }),
  GET_DECKS_FAILED: (error) => ({ error }),
});
