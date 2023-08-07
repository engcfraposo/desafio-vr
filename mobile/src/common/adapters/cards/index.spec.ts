import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Card } from '../../zod';
import { fetchCard, postCard } from './index';

const mockCard: Card = {
  id: 'card_id',
  number: '1234 5678 9012 3456',
  name: 'John Doe',
  validDate: '12/25',
  cvv: '000'
};
// Mock axios create function and its post and get methods
jest.mock('axios', () => {
  const mockedAxios = {
      post: jest.fn(),
      create: jest.fn(),
      get: jest.fn(),
  }
  mockedAxios.create = jest.fn(() => mockedAxios);
  return mockedAxios;
});
jest.mock('react-native-toast-message');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockResponseData = { ...mockCard };

describe('postCard', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });
  it('should post a card successfully', async () => {
    const { id, ...props} = mockCard
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponseData });
      const result = await postCard(mockCard);
      expect(result).toEqual(mockResponseData);
      expect(mockedAxios.post).toHaveBeenCalledWith('/cards', props);
      expect(Toast.show).toHaveBeenCalled();
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: 'Cadastro do cartão realizado com sucesso',
        visibilityTime: 2000,
      });
  });

  it('should handle errors when posting a card', async () => {
    const { id, ...props} = mockCard
    const mockErrorMessage = "some error";
    mockedAxios.post.mockRejectedValueOnce({ message: mockErrorMessage });

    await expect(postCard(mockCard)).rejects.toThrowError('Failed to post the card.');
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Ooops, tivermos um erro em carregar o seu cartão', // Corrected typo here
      text2: mockErrorMessage, // The error message from the mocked response
      visibilityTime: 2000,
    });
    expect(mockedAxios.post).toHaveBeenCalledWith('/cards', props);
  });
});

describe('fetchCard', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });
  it('should post a card successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [mockResponseData] });
    const result = await fetchCard();
    expect(result).toEqual([mockResponseData]);
    expect(mockedAxios.get).toHaveBeenCalledWith('/cards');
    expect(Toast.show).toHaveBeenCalled();
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Cartões carregado com sucesso',
      visibilityTime: 2000,
    });
  });

  it('should handle errors when fetching cards', async () => {
    const mockErrorMessage = "some error";
    mockedAxios.get.mockRejectedValueOnce({ message: mockErrorMessage });
    await expect(fetchCard()).rejects.toThrowError('Failed to fetch cards.');
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Não conseguimos carregar os seus cartões', // Corrected typo here
      text2: mockErrorMessage, // The error message from the mocked response
      visibilityTime: 2000,
    });
    expect(mockedAxios.get).toHaveBeenCalledWith('/cards');
  });
});
