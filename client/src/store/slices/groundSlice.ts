import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroundThunk } from '../thunkActions/groundThunk';
import { Ground, GroundSlice } from '../../types';


const initialState: GroundSlice = {
  grounds: [],
    error: null,
};

const groundSlice = createSlice({
  name: 'grounds',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GroundThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(GroundThunk.fulfilled, (state, action: PayloadAction<Ground[]>) => {
        state.grounds = action.payload;
      })
      .addCase(GroundThunk.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      })
  },
});

export const { clearError } = groundSlice.actions;
export default groundSlice.reducer;

