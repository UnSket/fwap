import { StoreState } from '../types';

export const createdDeck = (state: StoreState) => {
  if (state.decks.createdDeckId) {
    return state.decks.decksById[state.decks.createdDeckId];
  }
  return null;
};
export const decksError = (state: StoreState) => state.decks.error;
export const decksById = (state: StoreState) => state.decks.decksById;
