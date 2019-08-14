import { put, takeEvery, delay } from 'redux-saga/effects';
import { saveFileFailure, saveFileSuccess, saveFileRequest } from './actions';
import { request } from '../utils/tools';

function* saveFile({payload}: any): Iterable<any> {
  const {files} = payload;
  const base64 = files[0].url.split('base64,')[1];
  const data = new FormData();
  debugger
  data.append(files.name, atob(base64));
  const {imageUrl, error} = yield request({url: '/api/addFile', body: data, headers: {'Content-Type': 'multipart/form-data'}});
  yield put(saveFileSuccess(imageUrl));
}

export default function* loginSaga() {
  yield takeEvery(saveFileRequest, saveFile);
}
