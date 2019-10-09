import { StoreState } from '../types';

export const createdDeck = (state: StoreState) => {
  if (state.userDecks.createdDeckId) {
    return state.userDecks.decksById[state.userDecks.createdDeckId];
  }
  return null;
};
export const decksError = (state: StoreState) => state.userDecks.error;
export const decksById = (state: StoreState) => state.userDecks.decksById;
export const loading = (state: StoreState) => state.userDecks.loading;

export const cardsState = (state: StoreState) => state.userDecks.cards;
export const legendState = (state: StoreState) => state.userDecks.legend;
export const filesState = (state: StoreState) => state.userDecks.files;
