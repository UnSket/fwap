import { handleActions } from 'redux-actions';
import { loginRequest, gotUser, getUserFailed } from './actions';
import { State } from './types';

const defaultState: State = {
  loading: false,
  user: null
};

export default handleActions<State, any>(
  {
    [loginRequest.toString()]: () => ({user: null, loading: true}),
    [getUserFailed.toString()]: (state, {payload: error}) => ({user: null, loading: false, error}),
    [gotUser.toString()]: (state, {payload: user}) => ({user, loading: false})
  },
  defaultState
);
