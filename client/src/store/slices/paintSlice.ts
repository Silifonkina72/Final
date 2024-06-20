import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { paintThunk } from '../thunkActions/paintThunk';
import { Paint, PaintSlice } from '../../types';


const initialState: PaintSlice = {
    paints: [],
    error: null,
};

const paintSlice = createSlice({
  name: 'paints',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(paintThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(paintThunk.fulfilled, (state, action: PayloadAction<Paint[]>) => {
        state.paints = action.payload;
      })
      .addCase(paintThunk.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      })
  },
});

export const { clearError } = paintSlice.actions;
export default paintSlice.reducer;

