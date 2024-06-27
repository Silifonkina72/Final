import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {orderThunk, orderAllThunk} from '../thunkActions/orderThunk'



const initialState = {
  orders: [],
  error: null,
  ordersIsSent: [],
};

const userOrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError(state) {
        state.error = null;
      }
  },
  extraReducers: (builder) => {
    builder
   
      
       .addCase(orderThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(orderThunk.fulfilled, (state, action) => {
        state.ordersIsSent = action.payload;
      })
      .addCase(orderThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
    //   .addCase(orderAllThunk.pending, (state) => {
    //     state.error = null;
    //   })
    //   .addCase(orderAllThunk.fulfilled, (state, action) => {
    //     state.orders = action.payload;
    //   })
    //   .addCase(orderAllThunk.rejected, (state, action) => {
    //     state.error = action.payload;
    //   });
  }
});

export default userOrderSlice.reducer;
