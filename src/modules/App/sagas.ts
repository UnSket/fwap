// @flow

import { put, takeEvery, delay } from 'redux-saga/effects';
import {loadingStarted, loadingEnd} from './actions';

function* startLoading(): Iterable<any> {
  yield delay(2000);
  yield put(loadingEnd());
}

export default function* depotsSaga() {
  yield takeEvery(loadingStarted, startLoading);
  yield put(loadingStarted());
}
