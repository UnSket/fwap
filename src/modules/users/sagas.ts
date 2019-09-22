import { put, takeEvery } from 'redux-saga/effects';
import { usersFailed, updateUserSuccess, updateUserRequest, getUsersSuccess, getUsersRequest } from './actions';
import { request } from '../utils/tools';

function* getUsers({payload: {pageNumber, search, reset}}: any) {
  const {response: page, error} = yield request({url: `/api/users?page=${pageNumber}`, method: 'POST', body: JSON.stringify({search})});
  if (page) {
    yield put(getUsersSuccess(page, reset));
  } else {
    yield put(usersFailed(error));
  }
}

function* updateUser({payload: {user}}: any) {
  const {response: updatedUser, error} = yield request({url: '/api/user/update', body: JSON.stringify(user),method: 'POST'});
  if (updatedUser) {
    yield put(updateUserSuccess(updatedUser));
  } else {
    yield put(usersFailed(error));
  }
}

export default function* loginSaga() {
  yield takeEvery(getUsersRequest, getUsers);
  yield takeEvery(updateUserRequest, updateUser);
}
