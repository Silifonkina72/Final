import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchGetLogin, fetchLogOut } from "../thunkActions/thunkActions";

interface User {
  login: string;
  email: string;
  phone: string;
  password: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | undefined;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
const initialState: AuthState = {
  user: undefined,
  status: 'idle',
  error: null,
};

const logSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action: PayloadAction<string | null>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchGetLogin.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchLogOut.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.error = null;
      })
      .addCase(fetchLogOut.rejected, (state, action: PayloadAction<string | null>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default logSlice.reducer;