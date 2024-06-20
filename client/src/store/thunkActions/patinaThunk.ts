import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllPatina} from '../../api/patina'


export const patinaThunk = createAsyncThunk(
    'stains/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        return await fetchAllPatina();
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
