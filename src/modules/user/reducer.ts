import { handleActions, combineActions } from 'redux-actions';
import { loginRequest, loginSuccess, loginFailure } from './actions';
import { State } from './types';

const defaultState: State = {
  loading: false,
  user: null
};

export default handleActions<State, any>(
  {
    [loginRequest.toString()]: () => ({user: null, loading: true}),
    [loginFailure.toString()]: (state, {payload: error}) => ({user: null, loading: false, error}),
    [loginSuccess.toString()]: (state, {payload: user}) => ({user, loading: false})
  },
  defaultState
);
