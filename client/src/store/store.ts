
import { configureStore } from '@reduxjs/toolkit';
import regSlice from './slices/regSlice';
import logSlice from './slices/logSlice';
import logOutSlice from './slices/logOutSlice';
import basketSlice from './slices/basketSlice';

const storeOptions = {
  reducer: {
    regSlice,
    logSlice,
    logOutSlice,
    basketSlice,
  },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
