import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllLak, fetchMdfLak } from '../../api/lakApi';


export const LakThunk = createAsyncThunk(
    'laks/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        return await fetchAllLak();
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const LakThunkMdf = createAsyncThunk(
    'laksmdf/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        return await fetchMdfLak();
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
