
import { configureStore } from '@reduxjs/toolkit';
import regSlice from './slices/regSlice';
import logSlice from './slices/logSlice';
import logOutSlice from './slices/logOutSlice';


//import answerSlice from './ answerSlice'
////! import ваших слайсов

const storeOptions = {
  reducer: {
    regSlice,
    logSlice,
    logOutSlice
    //answerSlice, //! слайс под сущность
    // userSlice, //! слайс под сущность
    // someSlice, //! слайс под сущность
    // basketSlice, //! слайс под сущность
    // postSlice, //! слайс под сущность
  },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
