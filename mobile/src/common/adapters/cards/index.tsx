import axios from 'axios';
import { Card } from '../../zod';
import Toast from 'react-native-toast-message';


const baseUrl = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL
});

export const postCard = async (card: Card) => {
  const { id, ...props} = card;
  try {
    const response = await baseUrl.post<Card>('/cards', props);
    Toast.show({
        type: 'success',
        text1: 'Cadastro do cartão realizado com sucesso',
        visibilityTime: 2000,
    })
    return response.data;
  } catch (error: any) {
    Toast.show({
        type: 'error',
        text1: 'Ooops, tivermos um erro em carregar o seu cartão',
        text2: error.message,
        visibilityTime: 2000,
    })
    throw new Error('Failed to post the card.');
  }
};

export const fetchCard = async () => {
  try {
    const response = await baseUrl.get<Card[]>('/cards');
    Toast.show({
        type: 'success',
        text1: 'Cartões carregado com sucesso',
        visibilityTime: 2000,
    })
    return response.data;
  } catch (error: any) {
    Toast.show({
        type: 'error',
        text1: 'Não conseguimos carregar os seus cartões',
        text2: error.message,
        visibilityTime: 2000,
    })
    throw new Error('Failed to fetch cards.');
  }
};
