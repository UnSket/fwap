// @flow

import { fork } from 'redux-saga/effects';

import userSaga from './user/sagas';
import usersSaga from './users/sagas';
import decksSaga from './decks/sagas';
import filesSaga from './decks/files/sagas';

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(usersSaga);
  yield fork(decksSaga);
  yield fork(filesSaga);
}
