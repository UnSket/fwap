import { StoreState } from '../types';

export const users = (state: StoreState) => state.users.users;
export const loading = (state: StoreState) => state.users.loading;
export const page = (state: StoreState) => state.users.page;
export const last = (state: StoreState) => state.users.last;
