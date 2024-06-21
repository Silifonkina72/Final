import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Price } from '../../types/basketTypes';

type ProductSquare = Product & { square: number };

export type BasketState = {
  itemsSquare: ProductSquare[];
  itemsVolume: Product[];
  allPrice: Product[];
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
    removeItemVolume: (
      state,
      action: PayloadAction<{ model: string; id: number }>
    ) => {
      state.itemsVolume = state.itemsVolume.filter(
        (item) =>
          item.id !== action.payload.id || item.model !== action.payload.model
      );
    },

    setItemsSquare: (state, action: PayloadAction<ProductSquare[]>) => {
      state.itemsSquare = action.payload;
    },
    addItemSquare: (state, action: PayloadAction<ProductSquare>) => {
      state.itemsSquare.push(action.payload);
    },
    addItemsSquare: (state, action: PayloadAction<ProductSquare[]>) => {
      console.log('action.payload', action.payload);

      state.itemsSquare.push(...action.payload);
    },
    removeItemSquare: (
      state,
      action: PayloadAction<{ model: string; id: number }>
    ) => {
      console.log('state', state.itemsSquare);
      // const { id, model } = action.payload;
      state.itemsSquare = state.itemsSquare.map((subArray) => {
        console.log(subArray);
        if (Array.isArray(subArray)) {
          subArray.filter(
            (item) =>
              item.id !== action.payload.id &&
              item.model !== action.payload.model
          );
        }
        return subArray;
      });
      // state.itemsSquare = state.itemsSquare.filter(
      //   (item) => item.id !== action.payload.id
      // );
    },

    setItemPrice: (state, action: PayloadAction<Product[]>) => {
      state.allPrice = action.payload;
    },
    addItemPrice: (state, action: PayloadAction<Product>) => {
      state.allPrice.push(action.payload);
    },

    resetBasket: (state) => {
      state.allPrice = [];
    },

    countPriceAdd: (state, action: PayloadAction<Product>) => {
      console.log('action.payload ', action.payload);
      console.log('state.allPrice ', state.allPrice);

      const countEl = state.allPrice.find(
        (el) => el.id === action.payload.id && el.model === action.payload.model
      );
      console.log(countEl);

      const newState = (state.allPrice = state.allPrice.map((el) => {
        if (el.id === countEl?.id && el.model === countEl.model) {
          if (el.count) {
            el.count += 1;
          } else {
            el.count = 1;
          }
        }
        return el;
      }));

      state.allPrice = newState;
    },

    countPriceRem: (state, action: PayloadAction<Price>) => {
      console.log('action.payload ', action.payload);
      console.log('state.allPrice ', state.allPrice);

      const countEl = state.allPrice.find(
        (el) => el.id === action.payload.id && el.model === action.payload.model
      );
      console.log(countEl);

      const newState = (state.allPrice = state.allPrice.map((el) => {
        if (el.id === countEl.id && el.model === countEl.model) {
          if (el.count) {
            el.count -= 1;
          } else {
            el.count = 0;
          }
        }
        return el;
      }));

      state.allPrice = newState;
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
  countPriceAdd,
  countPriceRem,
} = basketSlice.actions;

export default basketSlice.reducer;
