import { createSlice } from "@reduxjs/toolkit";
import { fetchLogOut } from "./thunkActions";

const logOutSlice = createSlice({
    name: 'logOut',
    initialState: {
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogOut.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLogOut.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchLogOut.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default logOutSlice.reducer;