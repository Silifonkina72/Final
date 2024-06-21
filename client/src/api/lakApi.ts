import axios, { AxiosError } from 'axios';
import { logError } from '../utils/logger';
import {
  Lak,
} from '../types/Lak';

const API_URL = 'http://localhost:3000/api/lak';

export const fetchAllLak = async (): Promise<Lak[]> => {
    try {
      const response = await axios.get<Lak[]>(API_URL);
      return response.data;
    } catch (error) {
      logError(error);
      throw error as AxiosError;
    }
  };

  const API_URLMdf = 'http://localhost:3000/api/lak/mdf';

  export const fetchMdfLak = async (): Promise<Lak[]> => {
    try {
      const response = await axios.get<Lak[]>(API_URLMdf);
      return response.data;
    } catch (error) {
      logError(error);
      throw error as AxiosError;
    }
  };