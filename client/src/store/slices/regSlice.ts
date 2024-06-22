import { createSlice } from '@reduxjs/toolkit';
import { fetchReg} from '../thunkActions/thunkActions';

const regSlice = createSlice({
    name: 'reg',
  initialState: {
    loading: false,
    error: null,
    response: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReg.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.response = null;
      })
      .addCase(fetchReg.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(fetchReg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default regSlice.reducer;
