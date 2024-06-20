import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketState, Product, Price } from '../../types/basketTypes';

const initialState: BasketState = {
  items: [],
  allPrice: [],
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

    setItemPrice: (state, action: PayloadAction<Price[]>) => {
      state.allPrice = action.payload;
    },
    addItemPrice: (state, action: PayloadAction<Price>) => {
      state.allPrice.push(action.payload);
    },
    resetBasket: (state) => {
      state.allPrice = [];
    },

  },
});

export const { setItems, addItem, removeItem, addItemPrice,  setItemPrice, allPrice, resetBasket } = basketSlice.actions;

export default basketSlice.reducer;
