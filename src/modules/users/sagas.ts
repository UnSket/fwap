import { put, takeEvery } from 'redux-saga/effects';
import {
  usersFailed,
  updateUserSuccess,
  updateUserRequest,
  getUsersSuccess,
  getUsersRequest,
  createUserSuccess,
  createUserRequest
} from './actions';
import { request } from '../utils/tools';

function* getUsers({payload: {pageNumber, search, reset}}: any) {
  const {response: page, error} = yield request({url: `/api/users?page=${pageNumber}`, method: 'POST', body: JSON.stringify({search})});
  if (page) {
    yield put(getUsersSuccess(page, reset));
  } else {
    yield put(usersFailed(error));
  }
}

function* updateUser({payload: {userId, active}}: any) {
  const {response: updatedUser, error} = yield request({url: '/api/activateUser', body: JSON.stringify({userId, active}),method: 'POST'});
  if (updatedUser) {
    yield put(updateUserSuccess(updatedUser));
  } else {
    yield put(usersFailed(error));
  }
}

function* createUser({payload: {user}}: any) {
  const {response: createdUser, error} = yield request({url: '/api/createUser', body: JSON.stringify(user),method: 'POST'});
  if (createdUser) {
    yield put(createUserSuccess(createdUser));
  } else {
    yield put(usersFailed(error));
  }
}

export default function* loginSaga() {
  yield takeEvery(getUsersRequest, getUsers);
  yield takeEvery(updateUserRequest, updateUser);
  yield takeEvery(createUserRequest, createUser);
}
