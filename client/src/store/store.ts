
import { configureStore } from '@reduxjs/toolkit';


//import answerSlice from './ answerSlice'
////! import ваших слайсов

const storeOptions = {
  reducer: {
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
