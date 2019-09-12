import { handleActions } from 'redux-actions';
import { usersFailed, getUsersRequest, getUsersSuccess, updateUserRequest, updateUserSuccess } from './actions';
import { State } from './types';
import { combineReducers } from 'redux';

const defaultState: State = {
  loading: false,
  users: []
};

export default handleActions<State, any>(
  {
    [combineReducers([getUsersRequest, updateUserRequest]).toString()]: (state) => ({...state, loading: true}),
    [getUsersSuccess.toString()]: (state, {payload: {users}}) => ({users, loading: false}),
    [usersFailed.toString()]: (state, {payload: {error}}) => ({...state, loading: false, error}),
    [updateUserSuccess.toString()]: (state, {payload: {user: updatedUser}}) => {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      const updatedUsers = [...state.users.slice(0, index), updatedUser, ...state.users.slice(index)];
      return {users: updatedUsers, loading: false};
    }
  },
  defaultState
);
