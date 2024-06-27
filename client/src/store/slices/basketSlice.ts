import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Price } from '../../types/basketTypes';

export type ProductSquare = Product & { square: number };
export type ProductVolume = Product & { count: number };

export type BasketState = {
  allPrice: Product[];
  itemsSquare: ProductSquare[]; // в корзине
  itemsVolume: ProductVolume[]; // в корзине

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
    clearBasket: (state) => {
      state.itemsSquare = []
      state.itemsVolume = []
    },
    setItemsVolume: (state, action: PayloadAction<ProductVolume[]>) => {
      state.itemsVolume = action.payload;
    },
    addItemVolume: (state, action: PayloadAction<ProductVolume>) => {
      state.itemsVolume.push(action.payload);
    },
    addItemsVolume: (state, action: PayloadAction<ProductVolume[]>) => {
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

    plusItemVolume: (
      state,
      action: PayloadAction<{ model: string; id: number; count: number }>
    ) => {
      const { model, id, count } = action.payload;
      const item = state.itemsVolume.find(
        (item) => item.model === model && item.id === id
      );
      if (item) {
        item.count += 1;
      }
    },

    minusItemVolume: (
      state,
      action: PayloadAction<{ model: string; id: number; count: number }>
    ) => {
      const { model, id, count } = action.payload;
      const item = state.itemsVolume.find(
        (item) => item.model === model && item.id === id
      );
      if (item) {
        item.count -= 1;
      }
    },

    setItemsSquare: (state, action: PayloadAction<ProductSquare[]>) => {
      state.itemsSquare = action.payload;
    },
    addItemSquare: (state, action: PayloadAction<ProductSquare>) => {
      state.itemsSquare.push(action.payload);
    },
    addItemsSquare: (state, action: PayloadAction<ProductSquare[]>) => {
      state.itemsSquare.push(...action.payload);
    },
    removeItemSquare: (
      state,
      action: PayloadAction<{ model: string; id: number }>
    ) => {
      state.itemsSquare = state.itemsSquare.filter(
        (item) =>
          item.id !== action.payload.id || item.model !== action.payload.model
      );
    },
    plusItemSquare: (
      state,
      action: PayloadAction<{ model: string; id: number; square: number }>
    ) => {
      state.itemsSquare.forEach((item) => {
        item.square += 1;
      });
    },

    minusItemSquare: (
      state,
      action: PayloadAction<{ model: string; id: number; square: number }>
    ) => {
      state.itemsSquare.forEach((item) => {
        item.square -= 1;
      });
    },

    setItemPrice: (state, action: PayloadAction<Product[]>) => {
      state.allPrice = action.payload;
    },

    addItemPrice: (state, action: PayloadAction<Product>) => {
      const findUniq = state.allPrice?.find(
        (price) =>
          price.name === action.payload.name && price.id === action.payload.id
      );

      if (!findUniq) {
        state.allPrice.push(action.payload);
      }
    },

    resetBasket: (state) => {
      state.allPrice = [];
    },

    countPriceAdd: (
      state,
      action: PayloadAction<{ id: number; model: string; count: number }>
    ) => {
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

    countPriceRem: (state, action: PayloadAction<ProductVolume>) => {
      console.log('action.payload ', action.payload);
      console.log('state.allPrice ', state.allPrice);

      const countEl = state.allPrice.find(
        (el) => el.id === action.payload.id && el.model === action.payload.model
      );

      console.log('countEl', countEl);

      const newState = (state.allPrice = state.allPrice.map((el) => {
        if (el.id === countEl.id && el.model === countEl.model) {
          if (el.count) {
            el.count -= 1;
          } else {
            el.count = 0;
          }
        }
        console.log('el', el);

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
  plusItemVolume,
  minusItemVolume,
  addItemsVolume,
  addItemsSquare,
  setItemsSquare,
  addItemSquare,
  removeItemSquare,
  plusItemSquare,
  minusItemSquare,
  addItemPrice,
  setItemPrice,
  resetBasket,
  countPriceAdd,
  countPriceRem,
} = basketSlice.actions;

export default basketSlice.reducer;
export const { clearError, clearBasket } = basketSlice.actions;
