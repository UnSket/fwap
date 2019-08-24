import { put, takeEvery } from 'redux-saga/effects';
import { loginRequest, gotUser, getUserFailed, getCurrentUserRequest } from './actions';
import { request } from '../utils/tools';

function* login({payload}: any) {
  const {username, password} = payload;
  const {user, error} = yield request({url: '/api/login', body: JSON.stringify({username, password}), method: 'POST'});
  if (error) {
    if (error.status === 401) {
      const data = yield error.json();
      yield put(getUserFailed(data.message));
    } else {
      const data = yield error.text();
      yield put(getUserFailed(data));
    }
  } else {
    yield put(gotUser(user));
  }
}

function* getCurrentUser() {
  const {user, error} = yield request({url: '/api/currentUser', method: 'GET'});
  if (error) {
    if (error.status === 401) {
      yield put(getUserFailed(true));
    } else {
      const data = yield error.text();
      yield put(getUserFailed(data));
    }
  } else {
    yield put(gotUser(user));
  }
}

export default function* loginSaga() {
  yield takeEvery(loginRequest, login);
  yield takeEvery(getCurrentUserRequest, getCurrentUser);
}
