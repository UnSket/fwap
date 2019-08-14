import { handleActions, combineActions } from 'redux-actions';
import { saveFileFailure, saveFileRequest, saveFileSuccess } from './actions';
import { Action, State } from './types';

const defaultState: State = {
  loading: false,
  files: []
};

export default handleActions<State, Action>(
  {
    [saveFileRequest.toString()]: state => ({...state, loading: true, error: null}),
    [saveFileSuccess.toString()]: (state, {payload: {fileUrl}}) => {
      const newFiles = Object.assign({}, state.files);
      newFiles.push(fileUrl);
      return { files: newFiles, loading: false, error: null };
    },
    [saveFileFailure.toString()]: (state, {payload: {error}}) => ({...state, loading: false, error})
  },
  defaultState
);
