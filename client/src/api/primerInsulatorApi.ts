import axios, { AxiosError } from 'axios';
import { logError } from '../utils/logger';
import {
    PrimerInsulator
} from '../types/PrimerInsulator';

const API_URL = 'http://localhost:3000/api/primerinsulator';

export const fetchAllPrimerInsulator = async (): Promise<PrimerInsulator[]> => {
    try {
      const response = await axios.get<PrimerInsulator[]>(API_URL);
      return response.data;
    } catch (error) {
      logError(error);
      throw error as AxiosError;
    }
  };