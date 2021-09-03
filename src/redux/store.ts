import {
  combineReducers, configureStore, getDefaultMiddleware,
} from '@reduxjs/toolkit';

import { persistStore, persistReducer, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import * as cards from './cards/slice';
import * as comments from './comments/slice';
import * as columns from './columns/slice';
import * as user from './user/slice';

export const rootReducer = combineReducers({
  cards: cards.reducer,
  comments: comments.reducer,
  user: user.reducer,
  columns: columns.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
