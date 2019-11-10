import user from './user/reducer';
import users from './users/reducer';
import userDecks from './userDecks/reducer';
import decks from './decks/reducer';
import legends from './legends/reducer';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    user,
    users,
    userDecks,
    decks,
    legends
  });
