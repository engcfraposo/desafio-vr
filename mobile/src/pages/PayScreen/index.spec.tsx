import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PayScreen from '.';
import Toast from 'react-native-toast-message';

// Mock the Toast.show function to prevent errors during testing

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

const mockCard = {
  id: 'card_id',
  number: '1234 5678 9012 3456',
  name: 'John Doe',
  validDate: '12/25',
};

const mockNextCard = {
  id: 'next_card_id',
  number: '9876 5432 1098 7654',
  name: 'Jane Doe',
  validDate: '12/25',
};

const mockCards = [mockCard, mockNextCard];

describe('PayScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly with the provided card and next card', () => {
    const route = { params: { id: 'card_id', cards: mockCards } };

    const { getByTestId } = render(<PayScreen route={route} navigation={mockNavigation} />);

    const payScreenContainer = getByTestId('payScreen');
    expect(payScreenContainer).toBeDefined();

    const creditCardElement = getByTestId('payScreen');
    expect(creditCardElement).toBeDefined();

    const payButton = getByTestId('payScreen');
    expect(payButton).toBeDefined();

    const nextCardElement = getByTestId('payScreen_nextCard-card');
    expect(nextCardElement).toBeDefined();
  });

  test('calls Toast.show when "pagar com esse cartão" button is pressed', async () => {
    const route = { params: { id: 'card_id', cards: mockCards } };

    const toastShowMock = jest.fn();
    Toast.show = toastShowMock;

    const { getByTestId } = render(<PayScreen route={route} navigation={mockNavigation} />);

    const payButton = getByTestId(`payScreen-button-#12C2E9-#fff`);
    expect(payButton).toBeDefined();

    fireEvent.press(payButton);

    expect(toastShowMock).toHaveBeenCalled();
    expect(toastShowMock).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Pagamento realizado com sucesso',
      text2: '****  ****  ****  3456 - John Doe',
      visibilityTime: 2000,
    });
  });

  test('navigates to the next card when the next card element is pressed', () => {
    const route = { params: { id: 'card_id', cards: mockCards } };

    const { getByTestId } = render(<PayScreen route={route} navigation={mockNavigation} />);

    const nextCardElement = getByTestId('payScreen_nextCard-card');
    expect(nextCardElement).toBeDefined();

    fireEvent.press(nextCardElement);

    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('PayScreen', {
      id: 'next_card_id',
      cards: [mockNextCard, mockCard],
    });
  });
});
