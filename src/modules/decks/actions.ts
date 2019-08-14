import { createActions } from 'redux-actions';

export const { createDeckRequest, createDeckSuccess, createDeckFailure } = createActions({
  CREATE_DECK_REQUEST: (deck) => ({deck}),
  CREATE_DECK_SUCCESS: (deck) => ({deck}),
  CREATE_DECK_FAILURE: (error) => ({error})
});
