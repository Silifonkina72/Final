import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Price } from '../../types/basketTypes';

export type BasketState = {
  itemsSquare: Product[];
  itemsVolume: Product[];
  allPrice: Price[];
  status: 'idle' | 'loading' | 'failed';
};

const initialState: BasketState = {
  itemsSquare: [],
  itemsVolume: [],
  allPrice: [],
  status: 'idle',
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setItemsVolume: (state, action: PayloadAction<Product[]>) => {
      state.itemsVolume = action.payload;
    },
    addItemVolume: (state, action: PayloadAction<Product>) => {
      state.itemsVolume.push(action.payload);
    },
    addItemsVolume: (state, action: PayloadAction<Product[]>) => {
      state.itemsVolume.push(...action.payload);
    },
    removeItemVolume: (state, action: PayloadAction<{ id: number }>) => {
      state.itemsVolume = state.itemsVolume.filter(
        (item) => item.id !== action.payload.id
      );
    },

    setItemsSquare: (state, action: PayloadAction<Product[]>) => {
      state.itemsSquare = action.payload;
    },
    addItemSquare: (state, action: PayloadAction<Product[]>) => {
      state.itemsSquare.push(...action.payload);
    },
    addItemsSquare: (state, action: PayloadAction<Product>) => {
      state.itemsSquare.push(action.payload);
    },
    removeItemSquare: (state, action: PayloadAction<{ id: number }>) => {
      state.itemsSquare = state.itemsSquare.filter(
        (item) => item.id !== action.payload.id
      );
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

export const {
  setItemsVolume,
  addItemVolume,
  removeItemVolume,
  addItemsVolume,
  addItemsSquare,
  setItemsSquare,
  addItemSquare,
  removeItemSquare,
  addItemPrice,
  setItemPrice,
  resetBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
