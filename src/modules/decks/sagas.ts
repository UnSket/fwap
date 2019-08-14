import { put, takeEvery, call } from 'redux-saga/effects';
import { createDeckSuccess, createDeckFailure, createDeckRequest } from './actions';
import { request } from '../utils/tools';

function* createDeck({payload: {deck}}: any): Iterable<any> {
  const {createdDeck, error} = yield request({url: '/api/perform_login', body: JSON.stringify(deck)});
  if (createdDeck) {
    yield put(createDeckSuccess(createdDeck));
  } else {
    yield put(createDeckFailure(error));
  }
}

export default function* loginSaga() {
  yield takeEvery(createDeckRequest, createDeck);
}
