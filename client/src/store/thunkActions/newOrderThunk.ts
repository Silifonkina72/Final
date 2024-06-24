import { createAsyncThunk } from '@reduxjs/toolkit';
import {createOrder} from '../../api/createOrder';

export const createOrderThunk = createAsyncThunk(
    'api/order/newOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            return await createOrder(orderData);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)