import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { phoneBookSlice } from './phonebook/slice';

export const rootReducer = combineReducers({
  phonebook: phoneBookSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
