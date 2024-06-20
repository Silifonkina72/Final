import axios, { AxiosError } from 'axios';
import { logError } from '../utils/logger';
import {
    Patina
} from '../types/Patina';

const API_URL = 'http://localhost:3000/api/patina';

export const fetchAllPatina = async (): Promise<Patina[]> => {
    try {
      const response = await axios.get<Patina[]>(API_URL);
      return response.data;
    } catch (error) {
      logError(error);
      throw error as AxiosError;
    }
  };