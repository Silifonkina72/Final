import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LakThunk, LakThunkMdf } from '../thunkActions/lakThunk';
import { Lak, LakSlice } from '../../types';


const initialState: LakSlice = {
    laks: [],
    error: null,
};

const lakSlice = createSlice({
  name: 'laks',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(LakThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(LakThunk.fulfilled, (state, action: PayloadAction<Lak[]>) => {
        state.stains = action.payload;
      })
      .addCase(LakThunk.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      })
      .addCase(LakThunkMdf.pending, (state) => {
        state.error = null;
      })
      .addCase(LakThunkMdf.fulfilled, (state, action: PayloadAction<Lak[]>) => {
        state.laks = action.payload;
      })
      .addCase(LakThunkMdf.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      })
  },
});

export const { clearError } = lakSlice.actions;
export default lakSlice.reducer;

