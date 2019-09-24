import { handleActions } from 'redux-actions';
import {
  usersFailed,
  getUsersRequest,
  getUsersSuccess,
  updateUserRequest,
  updateUserSuccess,
  createUserRequest,
  createUserSuccess
} from './actions';
import { State } from './types';
import { combineReducers } from 'redux';
import { Pageable } from '../../model/types/Pageable';
import { User } from '../../model/types/User';

const defaultState: State = {
  loading: false,
  users: [],
  page: -1,
  last: false
};

export default handleActions<State, any>(
  {
    [combineReducers([getUsersRequest, updateUserRequest, createUserRequest]).toString()]: (state) => ({...state, loading: true, error: null}),
    [getUsersSuccess.toString()]: (state, {payload: {page, reset}}: {payload: {page: Pageable<User>, reset?: boolean}}) => {
      if (reset) {
        return {
          users: [...page.content],
          page: page.number,
          loading: false,
          last: page.last
        };
      }
      if (page.number > state.page) {
        return {
          users: [...state.users, ...page.content],
          page: page.number,
          loading: false,
          last: page.last
        }
      }
      return state;
    },
    [usersFailed.toString()]: (state, {payload: {error}}) => ({...state, loading: false, error}),
    [updateUserSuccess.toString()]: (state, {payload: {user: updatedUser}}) => {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      const updatedUsers = [...state.users.slice(0, index), updatedUser, ...state.users.slice(index + 1)];
      return {...state, users: updatedUsers, loading: false};
    },
    [createUserSuccess.toString()]: (state, {payload: {user}}) => ({...state, users: [...state.users, user], loading: false})
  },
  defaultState
);
