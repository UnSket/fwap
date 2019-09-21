import { put, takeEvery } from 'redux-saga/effects';
import { getDecksSuccess, getDecksRequest, getDecksFailed } from './actions';
import { request } from '../utils/tools';

function* getDecks({payload: {pageNumber, search, reset}}: any) {
  const {response: page, error} = yield request({url: `/api/decks?page=${pageNumber}`, method: 'POST', body: JSON.stringify({search})});
  if (page) {
    yield put(getDecksSuccess(page,reset));
  } else {
    yield put(getDecksFailed(error));
  }
}

export default function* decksSaga() {
  yield takeEvery(getDecksRequest, getDecks);
}
