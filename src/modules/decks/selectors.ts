import { StoreState } from '../types';

export const decks = (state: StoreState) => state.decks.decks;
export const loading = (state: StoreState) => state.decks.loading;
export const page = (state: StoreState) => state.decks.page;
export const last = (state: StoreState) => state.decks.last;
