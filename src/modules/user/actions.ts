import { createActions } from 'redux-actions';

export const { loginRequest, loginSuccess, loginFailure } = createActions({
  LOGIN_REQUEST: (username, password) => ({username, password}),
  LOGIN_SUCCESS: (user) => ({user}),
  LOGIN_FAILURE: (error) => (error)
});
