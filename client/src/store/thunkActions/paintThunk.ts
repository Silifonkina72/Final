import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllPaint } from '../../api/PaintApi'


export const paintThunk = createAsyncThunk(
    'paints/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        return await fetchAllPaint();
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
