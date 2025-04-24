import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';
import { loadState, saveState } from '../utils/localStorage';
import { throttle } from 'lodash';

// Load state from localStorage
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
  preloadedState: persistedState,
});

// Save state to localStorage with throttling to avoid performance issues
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);
