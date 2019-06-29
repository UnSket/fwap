import { handleActions, combineActions } from 'redux-actions';
import { loadingStarted, loadingEnd } from './actions';
import { Payload, State } from './types';

const defaultState: State = {
  loading: false
};

export default handleActions<State, Payload>(
  {
    [combineActions(loadingStarted, loadingEnd).toString()]: (
      state,
      { payload: { loading } }
    ) => ({
      ...state,
      loading
    })
  },
  defaultState
);
