import { put, takeEvery } from 'redux-saga/effects';
import { usersFailed, updateUserSuccess, updateUserRequest, getUsersSuccess, updateUserFailed, getUsersRequest } from './actions';
import { request } from '../utils/tools';

function* getUsers() {
  const {response: users, error} = yield request({url: '/api/users', method: 'POST', body: JSON.stringify({active: true})});
  if (users) {
    yield put(getUsersSuccess(users.content));
  } else {
    yield put(usersFailed(error));
  }
}

function* updateUser({payload: {user}}: any) {
  const {response: updatedUser, error} = yield request({url: '/api/user/uppdate', body: JSON.stringify(user),method: 'POST'});
  if (updatedUser) {
    console.log(updatedUser);
    yield put(updateUserSuccess(updatedUser));
  } else {
    yield put(usersFailed(error));
  }
}

export default function* loginSaga() {
  yield takeEvery(getUsersRequest, getUsers);
  yield takeEvery(updateUserRequest, updateUser);
}
