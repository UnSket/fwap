import { put, takeEvery, throttle } from 'redux-saga/effects';
import {
  createDeckSuccess,
  deckFailure,
  createDeckRequest,
  getDeckSuccess,
  getDeckRequest,
  getUserDecksRequest,
  getUserDecksSuccess,
  updateDeckRequest,
  getDeckCardsRequest,
  saveCardsRequest,
  getDeckCardsFailure,
  getDeckCardsSuccess
} from './actions';
import { request } from '../utils/tools';

function* createDeck({payload: {deck}}: any): Iterable<any> {
  const { response: createdDeck, error } = yield request({
    url: '/api/deck',
    body: JSON.stringify(deck),
    method: 'POST'
  });
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
  const {response: createdDecks, error} = yield request({url: `/api/decks/my`});
  if (createdDecks) {
    yield put(getUserDecksSuccess(createdDecks));
  } else {
    yield put(deckFailure(error));
  }
}

function* updateDeck({payload: {deckId, name, description}}: any): Iterable<any> {
  const {response: createdDeck, error} = yield request({url: `/api/deck/update`, body: JSON.stringify({id: deckId, name, description}), method: 'PUT'});
  if (createdDeck) {
    yield put(getDeckSuccess(createdDeck));
  } else {
    yield put(deckFailure(error));
  }
}

function* getDeckCards({payload: {deckId}}: any): Iterable<any> {
  const {response: cards, error} = yield request({url: `/api/deck/enriched/${deckId}`});
  if (cards) {
    yield put(getDeckCardsSuccess(deckId, cards));
  } else {
    yield put(getDeckCardsFailure(error));
  }
}

function* saveCards({payload: {deckId, cards}}: any): Iterable<any> {
  const {response: updatedCards, error} = yield request({url: `/api/deck/cards`, method: 'POST', body: JSON.stringify({deckId, cards})});
  if (updatedCards) {
    yield put(getDeckCardsSuccess(deckId, updatedCards));
  } else {
    yield put(getDeckCardsFailure(error));
  }
}

export default function* loginSaga() {
  yield takeEvery(createDeckRequest, createDeck);
  yield takeEvery(getDeckRequest, getDeck);
  yield takeEvery(getUserDecksRequest, getDecks);
  yield takeEvery(updateDeckRequest, updateDeck);
  yield takeEvery(getDeckCardsRequest, getDeckCards);
  yield takeEvery(saveCardsRequest, saveCards);
}
