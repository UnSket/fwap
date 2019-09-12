import app from './app/reducer';
import user from './user/reducer';
import users from './users/reducer';
import decks from './decks/reducer';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    app,
    user,
    users,
    decks,
  });
