import { put, takeEvery, call } from 'redux-saga/effects';
import { createDeckSuccess, deckFailure, createDeckRequest, getDeckSuccess, getDeckRequest } from './actions';
import { request } from '../utils/tools';

function* createDeck({payload: {deck}}: any): Iterable<any> {
  const {response: createdDeck, error} = yield request({url: '/api/deck', body: JSON.stringify(deck), method: 'POST'});
  if (createdDeck) {
    yield put(createDeckSuccess(createdDeck));
  } else {
    yield put(deckFailure(error));
  }
}

function* getDeck({payload: {id}}: any): Iterable<any> {
  const {response: createdDeck, error} = yield request({url: `/api/deck/${id}`});
  if (createdDeck) {
    yield put(createDeckSuccess(createdDeck));
  } else {
    yield put(deckFailure(error));
  }
}

export default function* loginSaga() {
  yield takeEvery(createDeckRequest, createDeck);
  yield takeEvery(getDeckRequest, getDeck);
}
