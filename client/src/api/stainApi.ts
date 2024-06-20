import axios, { AxiosError } from 'axios';
import { logError } from '../utils/logger';
import {
  Stain,
} from '../types/stainTypes';

const API_URL = 'http://localhost:3000/api/stain';

export const fetchAllStain = async (): Promise<Stain[]> => {
    try {
      const response = await axios.get<Stain[]>(API_URL);
      return response.data;
    } catch (error) {
      logError(error);
      throw error as AxiosError;
    }
  };
