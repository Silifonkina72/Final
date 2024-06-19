
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StainsThunk } from '../thunkActions/StainThunk';
import { Stain, StainSlice } from '../../types';


const initialState: StainSlice = {
    stains: [],
    error: null,
};

const stainSlice = createSlice({
  name: 'stains',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(StainsThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(StainsThunk.fulfilled, (state, action: PayloadAction<Stain[]>) => {
        state.stains = action.payload;
      })
      .addCase(StainsThunk.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      })
  },
});

export const { clearError } = stainSlice.actions;
export default stainSlice.reducer;

