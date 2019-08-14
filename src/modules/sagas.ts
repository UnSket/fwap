// @flow

import { fork } from 'redux-saga/effects';

import appSaga from './app/sagas';
import userSaga from './user/sagas';
import decksSaga from './decks/sagas';
import filesSaga from './files/sagas';

export default function* rootSaga() {
  yield fork(appSaga);
  yield fork(userSaga);
  yield fork(decksSaga);
  yield fork(filesSaga);
}
