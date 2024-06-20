import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { patinaThunk } from '../thunkActions/patinaThunk';
import { Patina, PatinaSlice } from '../../types';


const initialState: PatinaSlice = {
    patinas: [],
    error: null,
};

const patinaSlice = createSlice({
  name: 'patinas',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(patinaThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(patinaThunk.fulfilled, (state, action: PayloadAction<Patina[]>) => {
        state.patinas = action.payload;
      })
      .addCase(patinaThunk.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      })
  },
});

export const { clearError } = patinaSlice.actions;
export default patinaSlice.reducer;

