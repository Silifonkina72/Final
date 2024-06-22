import axios, { AxiosError } from 'axios';
import { logError } from '../utils/logger';
import {
  Ground,
} from '../types/Ground';

const API_URL = 'http://localhost:3000/api/ground';

export const fetchAllGround = async (): Promise<Ground[]> => {
    try {
      const response = await axios.get<Ground[]>(API_URL);
      return response.data;
    } catch (error) {
      logError(error);
      throw error as AxiosError;
    }
  };