import axios, { AxiosError } from 'axios';
import { logError } from '../utils/logger';
import {
  Stain,
} from '../types';

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

// export const createTodo = async ({ title }: TodoCreateRequest): Promise<TodoCreateResponse> => {
//   try {
//     const response = await axios.post<TodoCreateResponse>(API_URL, { title });
//     return response.data;
//   } catch (error) {
//     logError(error);
//     throw error as AxiosError;
//   }
// };



// export const updateTodo = async (todo: TodoUpdateRequest): Promise<TodoUpdateResponse> => {
//   try {
//     const response = await axios.put<TodoUpdateResponse>(`${API_URL}/${todo.id}`, todo);
//     return response.data;
//   } catch (error) {
//     logError(error);
//     throw error as AxiosError;
//   }
// };

// export const deleteTodo = async (id: number): Promise<void> => {
//   try {
//     await axios.delete(`${API_URL}/${id}`);
//   } catch (error) {
//     logError(error);
//     throw error as AxiosError;
//   }
// };

//   TodoCreateRequest,
//   TodoCreateResponse,
//   TodoUpdateRequest,
//   TodoUpdateResponse,