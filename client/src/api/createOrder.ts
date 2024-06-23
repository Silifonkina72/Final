import axios, { AxiosError } from 'axios';
import { logError } from '../utils/logger';

export const createOrder = async (order) => {
    try {
        const response = await axios.post('http://localhost:3000/api/order/newOrder', order);
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}