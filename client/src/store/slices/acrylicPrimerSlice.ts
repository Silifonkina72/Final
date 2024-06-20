import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { acrylicPrimerThunk } from "../thunkActions/acrylicPrimerThunk";
import { AcrylicPrimer, AcrylicPrimerSlice } from "../../types";

const initialState: AcrylicPrimerSlice = {
  acrylicPrimers: [],
  error: null,
};

const acrylicPrimerSlice = createSlice({
  name: "acrylicPrimers",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(acrylicPrimerThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(
        acrylicPrimerThunk.fulfilled,
        (state, action: PayloadAction<AcrylicPrimer[]>) => {
          state.acrylicPrimers = action.payload;
        }
      )
      .addCase(
        acrylicPrimerThunk.rejected,
        (state, action: PayloadAction<string>) => {
          state.error = action.payload;
        }
      );
  },
});

export const { clearError } = acrylicPrimerSlice.actions;
export default acrylicPrimerSlice.reducer;
