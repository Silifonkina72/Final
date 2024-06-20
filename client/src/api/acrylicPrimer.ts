import axios, { AxiosError } from 'axios';
import { logError } from '../utils/logger';
import {
    AcrylicPrimer
} from '../types/AcrylicPrimer';

const API_URL = 'http://localhost:3000/api/acrylicprimer';

export const fetchAllAcrylicPrimer = async (): Promise<AcrylicPrimer[]> => {
    try {
      const response = await axios.get<AcrylicPrimer[]>(API_URL);
      return response.data;
    } catch (error) {
      logError(error);
      throw error as AxiosError;
    }
  };