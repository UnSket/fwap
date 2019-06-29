// @flow

import { fork } from 'redux-saga/effects';

import appSaga from './App/sagas';

export default function* rootSaga() {
  yield fork(appSaga);
}
