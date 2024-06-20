import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllGround } from '../../api/groundApi';


export const GroundThunk = createAsyncThunk(
    'grounds/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        return await fetchAllGround();
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
