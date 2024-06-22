import axios, { AxiosError } from 'axios';
import { logError } from '../utils/logger';
import {
    Paint
} from '../types/Paint';

const API_URL = 'http://localhost:3000/api/paint';

export const fetchAllPaint = async (): Promise<Paint[]> => {
    try {
      const response = await axios.get<Paint[]>(API_URL);
      return response.data;
    } catch (error) {
      logError(error);
      throw error as AxiosError;
    }
  };