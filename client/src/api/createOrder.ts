import axios, { AxiosError } from 'axios';
import { logError } from '../utils/logger';

export const fetchNewOrder = async (model) => {
    try {
        const Model = model.charAt(0).toUpperCase() + model.slice(1).toLowerCase();
        const response = await  axios.get()
    } catch (error) {
        
    }
}