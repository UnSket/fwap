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
  saveLegendRequest,
  saveImageSuccess,
  getDeckLegendRequest,
  saveLegendCardsRequest,
  changeLegendTextSizeRequest,
  getDeckLegendSuccess,
  legendFailure,
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
  const {response: deck, error} = yield request({url: `/api/deck/enriched/${deckId}`});
  if (deck) {
    yield put(getDeckCardsSuccess(deck));
  } else {
    yield put(getDeckCardsFailure(error));
  }
}

function* saveCards({payload: {deckId, cards}}: any): Iterable<any> {
  const {response: updatedDeck, error} = yield request({url: `/api/deck/cards`, method: 'POST', body: JSON.stringify({deckId, cards})});
  if (updatedDeck) {
    yield put(getDeckCardsSuccess(updatedDeck));
  } else {
    yield put(getDeckCardsFailure(error));
  }
}

function* saveLegend({payload: {image, deckId}}: any): Iterable<any> {
  for (let i = 1; i < 22; i++) {
    const { response: createdImage, error } = yield request({
      url: `/api/deck/text/legend`,
      method: 'POST',
      body: JSON.stringify({ deckId, imageId: i, text: image.text })
    });
    if (createdImage) {
      yield put(saveImageSuccess(deckId, createdImage));
    } else {
      yield put(legendFailure(error));
    }
  }
}

function* getDeckLegend({payload: {deckId}}: any): Iterable<any> {
  const {response: deck, error} = yield request({url: `/api/legend/${deckId}`});
  if (deck) {
    yield put(getDeckLegendSuccess(deck));
  } else {
    yield put(legendFailure(error));
  }
}

function* saveLegendCards({payload: {deckId, cards}}: any): Iterable<any> {
  const {response: updatedDeck, error} = yield request({url: `/api/legend/update`, method: 'POST', body: JSON.stringify({deckId, cards: cards.flat()})});
  if (updatedDeck) {
    yield put(getDeckLegendSuccess(updatedDeck));
  } else {
    yield put(legendFailure(error));
  }
}

function* changeTextSize({payload: {deckId, textSize}}: any): Iterable<any> {
  const {response: updatedDeck, error} = yield request({url: `/api/legend/text/config`, method: 'POST', body: JSON.stringify({id: deckId, size: textSize})});
  if (updatedDeck) {
    yield put(getDeckSuccess(updatedDeck));
  } else {
    yield put(deckFailure(error));
  }
}

export default function* loginSaga() {
  yield takeEvery(createDeckRequest, createDeck);
  yield takeEvery(getDeckRequest, getDeck);
  yield takeEvery(getUserDecksRequest, getDecks);
  yield takeEvery(updateDeckRequest, updateDeck);
  yield takeEvery(getDeckCardsRequest, getDeckCards);
  yield takeEvery(saveCardsRequest, saveCards);
  yield takeEvery(saveLegendRequest, saveLegend);
  yield takeEvery(getDeckLegendRequest, getDeckLegend);
  yield takeEvery(saveLegendCardsRequest, saveLegendCards);
  yield throttle(1000, changeLegendTextSizeRequest, changeTextSize);
}
