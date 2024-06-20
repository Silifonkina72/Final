import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { primerInsulatorThunk } from '../thunkActions/primerInsulatorThunk';
import { PrimerInsulator, PrimerInsulatorSlice } from '../../types';


const initialState: PrimerInsulatorSlice = {
    primerInsulators: [],
    error: null,
};

const primerInsulatorSlice = createSlice({
  name: 'primerInsulators',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(primerInsulatorThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(primerInsulatorThunk.fulfilled, (state, action: PayloadAction<PrimerInsulator[]>) => {
        state.primerInsulators = action.payload;
      })
      .addCase(primerInsulatorThunk.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      })
  },
});

export const { clearError } = primerInsulatorSlice.actions;
export default primerInsulatorSlice.reducer;

