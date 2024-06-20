
import { configureStore } from '@reduxjs/toolkit';
import stainSlice from './slices/StainSlice'
import basketSlice from './slices/basketSlice';
import logOutSlice from './slices/logOutSlice';
import logSlice from './slices/logSlice';
import regSlice from './slices/regSlice';


const storeOptions = {
  reducer: {
    stainSlice,
    basketSlice,
    logOutSlice,
    logSlice,
    regSlice,
  },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
