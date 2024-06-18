//! #1 => go main.tsx

import { configureStore } from '@reduxjs/toolkit';
//! import ваших слайсов
import regSlice from './regSlice';
import logSlice from './logSlice';

const storeOptions = {
    reducer: {
    regSlice, //! слайс под сущность
    logSlice, //! слайс под сущность
     //! слайс под сущность
    // basketSlice, //! слайс под сущность
    // postSlice, //! слайс под сущность
    },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
