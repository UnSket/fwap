import { handleActions, combineActions } from 'redux-actions';
import { loginRequest, loginSuccess, loginFailure } from './actions';
import { State } from './types';

const defaultState: State = {
  loading: false,
  user: null
};

export default handleActions<State>(
  {
    [loginRequest.toString()]: () => ({user: null, loading: true}),
    [loginFailure.toString()]: () => ({user: null, loading: false}),
    [loginSuccess.toString()]: (state, {payload: user}) => ({user, loading: false})
  },
  defaultState
);
