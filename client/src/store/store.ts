
import { configureStore } from '@reduxjs/toolkit';
import stainSlice from './slices/StainSlice'
import basketSlice from './slices/basketSlice';
import logOutSlice from './slices/logOutSlice';
import regSlice from './slices/regSlice';
import logSlice from './slices/logSlice';
import groundSlice from './slices/groundSlice';
import lakSlice from './slices/lakSlice';
import primerInsulatorSlice from './slices/primerInsulatorSlice'
import paintSlice from './slices/paintSlice';
import acrylicPrimerSlice from './slices/acrylicPrimerSlice'
import patinaSlice from './slices/patinaSlice'
import inventorySlice from './slices/inventorySlice';

////! import ваших слайсов

const storeOptions = {
  reducer: {
    stainSlice, //! слайс под сущность
    basketSlice,
    logOutSlice,
    regSlice,
    logSlice,
    groundSlice,
    lakSlice,
    primerInsulatorSlice, 
    paintSlice,
    acrylicPrimerSlice,
    patinaSlice,
    inventorySlice,
  },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
