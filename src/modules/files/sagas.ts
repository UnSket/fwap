import { put, takeEvery, delay } from 'redux-saga/effects';
import { saveFileFailure, saveFileSuccess, saveFileRequest } from './actions';
import { request } from '../utils/tools';
import { ImageWithPreview } from '../../model/types/ImageWithPreview';

type Action = {
  payload: {
    files: Array<ImageWithPreview>
  }
}

function* saveFile({payload}: Action): Iterable<any> {
  const {files} = payload;
  const data = new FormData();
  data.append(files[0].file.name, files[0].file);
  const {imageUrl, error} = yield request({url: '/api/addFile', body: data, headers: {} });
  yield put(saveFileSuccess(imageUrl));
}

export default function* loginSaga() {
  yield takeEvery(saveFileRequest, saveFile);
}
