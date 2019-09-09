import { put, takeEvery } from 'redux-saga/effects';
import {
  createDeckSuccess,
  deckFailure,
  createDeckRequest,
  getDeckSuccess,
  getDeckRequest,
  getDecksRequest,
  getDecksSuccess,
  updateDeckRequest,
  getDeckCardsRequest,
  saveCardsRequest,
  saveLegendRequest
} from './actions';
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
    yield put(getDeckSuccess(createdDeck));
  } else {
    yield put(deckFailure(error));
  }
}

function* getDecks(): Iterable<any> {
  const {response: createdDecks, error} = yield request({url: `/api/decks/`});
  if (createdDecks) {
    yield put(getDecksSuccess(createdDecks));
  } else {
    yield put(deckFailure(error));
  }
}

function* updateDeck({payload: {deckId, name, description}}: any): Iterable<any> {
  const {response: createdDeck, error} = yield request({url: `/api/deck/${deckId}`, body: JSON.stringify({name, description}), method: 'PUT'});
  if (createdDeck) {
    yield put(getDeckSuccess(createdDeck));
  } else {
    yield put(deckFailure(error));
  }
}

function* getDeckCards({payload: {deckId}}: any): Iterable<any> {
  const {response: createdDeck, error} = yield request({url: `/api/deck/enriched/${deckId}`});
  if (createdDeck) {
    yield put(getDeckSuccess(createdDeck));
  } else {
    yield put(deckFailure(error));
  }
}

function* saveCards({payload: {deckId, cards}}: any): Iterable<any> {
  const {response: updatedDeck, error} = yield request({url: `/api/deck/saveCards/${deckId}`, method: 'POST', body: JSON.stringify({deckId, cards})});
  if (updatedDeck) {
    yield put(getDeckSuccess(updatedDeck));
  } else {
    yield put(deckFailure(error));
  }
}

function* saveLegend({payload: {image, deckId}}: any): Iterable<any> {
  const {response: updatedDeck, error} = yield request({url: `api/deck/${deckId}/image/${image.id}/text/${image.text}`, method: 'POST', body: JSON.stringify({deckId, image})});
  if (updatedDeck) {
    yield put(getDeckSuccess(updatedDeck));
  } else {
    yield put(deckFailure(error));
  }
}

export default function* loginSaga() {
  yield takeEvery(createDeckRequest, createDeck);
  yield takeEvery(getDeckRequest, getDeck);
  yield takeEvery(getDecksRequest, getDecks);
  yield takeEvery(updateDeckRequest, updateDeck);
  yield takeEvery(getDeckCardsRequest, getDeckCards);
  yield takeEvery(saveCardsRequest, saveCards);
  yield takeEvery(saveLegendRequest, saveLegend);
}
