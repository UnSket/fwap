import { put, takeEvery } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from './actions';
import { request } from '../utils/tools';

function* login({payload}: any): Iterable<any> {
  const {username, password} = payload;
  const {user, error} = yield request({url: '/api/perform_login', body: JSON.stringify({username, password})});
  if (error) {
    yield put(loginFailure(error));
  } else {
    yield put(loginSuccess(user));
  }
}

export default function* loginSaga() {
  yield takeEvery(loginRequest, login);
}
