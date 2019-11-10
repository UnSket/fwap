import { put, takeEvery } from 'redux-saga/effects';
import {
  getDeckLegendsSuccess,
  legendsFailure,
  getDeckLegendsRequest,
  gotLegend,
  createLegendRequest,
  setLegendImageTextRequest,
  updateLegendRequest
} from './actions';
import { request } from '../utils/tools';

function* getDeckLegends({payload: {deckId}}: any): Iterable<any> {
  const { response: deckLegends, error } = yield request({
    url: `/api/legends/${deckId}`,
  });

  if (deckLegends) {
    yield put(getDeckLegendsSuccess(deckLegends));
  } else {
    yield put(legendsFailure(error));
  }
}

function* createLegend({payload: {deckId, name}}: any): Iterable<any> {
  const { response: createLegend, error } = yield request({
    method: 'PUT',
    body: JSON.stringify({deckId, name}),
    url: '/api/legend/create'
  });

  if (createLegend) {
    yield put(gotLegend(createLegend));
  } else {
    yield put(legendsFailure(error));
  }
}

function* setLegendImageText({payload: requestBody}: any): Iterable<any> {
  const { response: updatedLegend, error } = yield request({
    method: 'POST',
    body: JSON.stringify(requestBody),
    url: '/api/legend/text'
  });

  if (updatedLegend) {
    yield put(gotLegend(updatedLegend));
  } else {
    yield put(legendsFailure(error));
  }

}

function* updateLegend({payload: {legendId, cards, textSize}}: any): Iterable<any> {
  const {response: legend, error} = yield request({url: `/api/legend/update`, method: 'POST', body: JSON.stringify({legendId, cards: cards.flat(), textSize})});
  if (legend) {
    yield put(gotLegend(legend));
  } else {
    yield put(legendsFailure(error));
  }
}

export default function* loginSaga() {
  yield takeEvery(getDeckLegendsRequest, getDeckLegends);
  yield takeEvery(createLegendRequest, createLegend);
  yield takeEvery(setLegendImageTextRequest, setLegendImageText);
  yield takeEvery(updateLegendRequest, updateLegend);
}
