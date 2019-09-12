import { createActions } from 'redux-actions';

export const {
  getUsersRequest,
  getUsersSuccess,
  usersFailed,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed
} = createActions({
  GET_USERS_REQUEST: () => {},
  GET_USERS_SUCCESS: (users) => ({ users }),
  USERS_FAILED: (error) => ({ error }),
  UPDATE_USER_REQUEST: (user) => ({ user }),
  UPDATE_USER_SUCCESS: (user) => ({ user }),
});
