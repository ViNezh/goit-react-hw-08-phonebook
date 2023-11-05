import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { phoneBookSlice } from './phonebook/slice';
import { authReducer } from './auth/authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authConfig = {
  key: 'authorisation',
  storage,
  whitelist: ['token', 'authentificated'],
};

export const rootReducer = combineReducers({
  authorisation: persistReducer(authConfig, authReducer),
  phonebook: phoneBookSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
