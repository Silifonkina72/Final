import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllStain } from '../../api/stainApi'


export const StainsThunk = createAsyncThunk(
    'stains/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        return await fetchAllStain();
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
