import { put, takeEvery, delay } from 'redux-saga/effects';
import { saveFileFailure, saveFileSuccess, saveFileRequest } from './actions';
import { request } from '../utils/tools';
import { ImageWithPreview } from '../../model/types/ImageWithPreview';
import { file } from '@babel/types';

type Action = {
  payload: {
    files: Array<ImageWithPreview>,
    deckId: string
  }
}

function* saveFile({payload}: Action): Iterable<any> {
  const {files, deckId} = payload;
  const data = new FormData();
  files.forEach((file, index) => {
    data.append('files', file.file);
  });
  data.append('deckId', deckId);
  const {imageUrl, error} = yield request({url: '/api/files', body: data, headers: {}, method: 'POST' });
  yield put(saveFileSuccess(imageUrl));
}

export default function* loginSaga() {
  yield takeEvery(saveFileRequest, saveFile);
}
