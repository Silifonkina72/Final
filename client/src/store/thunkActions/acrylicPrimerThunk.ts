import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllAcrylicPrimer } from '../../api/acrylicPrimer'


export const acrylicPrimerThunk = createAsyncThunk(
    'acrylicPrimers/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        return await fetchAllAcrylicPrimer();
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );