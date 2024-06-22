import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Elements {
    id: number;
    priceArea: number;
    priceVolume: number;
    name: string;
    number: number;
    img: string;
}

interface InventoryState {
    items: Elements[];
    loading: boolean;
    error: string | null;
}

const initialState: InventoryState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchInventory = createAsyncThunk('/fetchinventory', async () => {
    const response = await axios.get<Elements[]>('http://localhost:3000/availability');
    return response.data;
});

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchInventory.pending, (state) => {
            state.loading =true;
            state.error = null;
        })
        .addCase(fetchInventory.fulfilled, (state,action) => {
            state.items = action.payload;
            state.loading = false;
        })
        .addCase(fetchInventory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'trouble with SHOW invention';
        });
    },
});

export default inventorySlice.reducer;