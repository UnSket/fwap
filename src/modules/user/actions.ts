import { createActions } from 'redux-actions';

export const { loginRequest, gotUser, getUserFailed, getCurrentUserRequest } = createActions({
  LOGIN_REQUEST: (username, password) => ({username, password}),
  GOT_USER: (user) => ({user}),
  GET_USER_FAILED: (error) => (error),
  GET_CURRENT_USER_REQUEST: (user) => (user),
});
