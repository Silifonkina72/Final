import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketState, Product } from '../../types/basketTypes';

const initialState: BasketState = {
  items: [],
  status: 'idle',
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setItems, addItem, removeItem } = basketSlice.actions;

export default basketSlice.reducer;
