// @flow

import { fork } from 'redux-saga/effects';

import userSaga from './user/sagas';
import usersSaga from './users/sagas';
import userDecksSaga from './userDecks/sagas';
import decksSaga from './decks/sagas';
import filesSaga from './userDecks/files/sagas';
import legendSaga from './legends/sagas';

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(usersSaga);
  yield fork(userDecksSaga);
  yield fork(filesSaga);
  yield fork(decksSaga);
  yield fork(legendSaga);
}
