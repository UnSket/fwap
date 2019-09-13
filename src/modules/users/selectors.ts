import { StoreState } from '../types';

export const userState = (state: StoreState) => state.users;

export const users = (state: StoreState) => state.users.users;
export const isLoading = (state: StoreState) => state.users.loading;
