import { combineReducers } from 'redux';

import * as user from './user/index';
import * as cards from './cards/index';
import * as columns from './columns/index';
import * as comments from './comments/index';

export const reducer = combineReducers({
  user: user.reducer,
  cards: cards.reducer,
  comments: comments.reducer,
  columns: columns.reducer,
});

export const actions = {
  user: user.actions,
  cards: cards.actions,
  comments: comments.actions,
  columns: columns.actions,
};

export const selectors = {
  user: user.selectors,
  comments: comments.selectors,
  columns: columns.selectors,
  cards: cards.selectors,
};
