import { put, takeEvery } from 'redux-saga/effects';
import { saveFileFailure, saveFileSuccess, saveFileRequest, updateImageRequest, updateImageSuccess, updateBacksideRequest } from './actions';
import { getDeckSuccess } from '../actions';
import { request } from '../../utils/tools';

type Action = {
  payload: {
    files: Array<File | Blob>,
    deckId: string,
    bgCleanUpFlags: boolean
  }
}

function* saveFile({payload}: Action): Iterable<any> {
  const {files, deckId, bgCleanUpFlags} = payload;
  const data = new FormData();
  files.forEach((file, index) => {
    data.append('files', file);
  });
  data.append('deckId', deckId);
  data.append('bgCleanUpFlags', String(bgCleanUpFlags));
  const {response: images, error} = yield request({url: '/api/files', body: data, headers: {}, method: 'POST' });
  if (images) {
    yield put(saveFileSuccess(images, deckId));
  } else {
    const errorText = yield error.text();
    yield put(saveFileFailure(errorText))
  }
}

function* updateFile({payload}: any): Iterable<any> {
  const {file, deckId, image, bgCleanUpFlags} = payload;
  const data = new FormData();
  data.append('file', file);
  data.append('imageId', image.id);
  data.append('bgCleanUpFlags', String(bgCleanUpFlags));
  const {response: newImage, error} = yield request({url: '/api/files/change', body: data, headers: {}, method: 'POST' });
  if (newImage) {
    yield put(updateImageSuccess(newImage, deckId));
  } else {
    const errorText = yield error.text();
    yield put(saveFileFailure(errorText))
  }
}


function* updateBackside({payload}: any): Iterable<any> {
  const {image, deckId, bgCleanUpFlags} = payload;
  const data = new FormData();
  data.append('files', image);
  data.append('deckId', deckId);
  data.append('bgCleanUpFlags', String(bgCleanUpFlags));
  const {response: deck, error} = yield request({url: `/api/deck/backside/${deckId}`, body: data, headers: {}, method: 'POST' });
  if (deck) {
    yield put(getDeckSuccess(deck));
  } else {
    const errorText = yield error.text();
    yield put(saveFileFailure(errorText))
  }
}

export default function* fileSaga() {
  yield takeEvery(saveFileRequest, saveFile);
  yield takeEvery(updateImageRequest, updateFile);
  yield takeEvery(updateBacksideRequest, updateBackside);
}
