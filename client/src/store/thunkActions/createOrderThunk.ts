import { createAsyncThunk } from '@reduxjs/toolkit';
import {createOrder, createProduct} from '../../api/createOrder';

export const createOrderThunk = createAsyncThunk(
    'api/order',
    async (orderData, { rejectWithValue }) => {
        try {
            const {id} = await createOrder(orderData);
            await createProduct({order: orderData, id: id})
            console.log('id from thunk', id);
            
            // return await createOrder(orderData);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)