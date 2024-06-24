import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createOrderThunk } from '../thunkActions/createOrderThunk';

interface OrderState {
  products: [];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  products: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError(state) {
        state.error = null;
      }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createOrderThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default orderSlice.reducer;
