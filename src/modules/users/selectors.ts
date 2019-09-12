import { StoreState } from '../types';

export const userState = (state: StoreState) => state.users;

export const user = (state: StoreState) => state.users.users;
