import axios from 'axios';
import { Card } from '../../zod';

const baseUrl = axios.create({
    baseURL: 'http://localhost:3000'
})

export const postCard = async (card: Card) => {
    try {
        const response = await baseUrl.post('/cards', card);
        return response.data;
    } catch (error: any) {
        console.error(error?.response)
    }
}