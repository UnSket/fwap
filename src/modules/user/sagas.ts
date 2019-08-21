import { put, takeEvery } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from './actions';
import { request } from '../utils/tools';

function* login({payload}: any): Iterable<any> {
  const {username, password} = payload;
  const {user, error} = yield request({url: '/api/login', body: JSON.stringify({username, password}), method: 'POST'});
  if (error) {
    if (error.status === 401) {
      const data = yield error.json();
      yield put(loginFailure(data.message));
    } else {
      const data = yield error.text();
      yield put(loginFailure(data));
    }
  } else {
    yield put(loginSuccess(user));
  }
}

export default function* loginSaga() {
  yield takeEvery(loginRequest, login);
}
