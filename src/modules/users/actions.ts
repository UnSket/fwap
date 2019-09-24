import { createActions } from 'redux-actions';

export const {
  getUsersRequest,
  getUsersSuccess,
  usersFailed,
  updateUserRequest,
  updateUserSuccess,
  createUserRequest,
  createUserSuccess
} = createActions({
  GET_USERS_REQUEST: (pageNumber, search, reset) => ({pageNumber, search, reset}),
  GET_USERS_SUCCESS: (page, reset) => ({ page, reset }),
  USERS_FAILED: (error) => ({ error }),
  UPDATE_USER_REQUEST: (userId, active) => ({ userId, active }),
  UPDATE_USER_SUCCESS: (user) => ({ user }),
  CREATE_USER_REQUEST: (user) => ({ user }),
  CREATE_USER_SUCCESS: (user) => ({ user })
});
