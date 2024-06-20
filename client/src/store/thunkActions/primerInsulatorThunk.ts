import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllPrimerInsulator } from '../../api/primerInsulatorApi'


export const primerInsulatorThunk = createAsyncThunk(
    'primerInsulators/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        return await fetchAllPrimerInsulator();
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
