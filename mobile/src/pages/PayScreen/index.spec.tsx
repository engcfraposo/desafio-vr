import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PayScreen from '.';
import Toast from 'react-native-toast-message';

jest.mock('@react-navigation/native', () => {
  const actualNavigationModule = jest.requireActual('@react-navigation/native');
  return {
    ...actualNavigationModule,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        id: 'card_id',
        cards: [
          {
            id: 'card_id',
            number: '1234 5678 9012 3456',
            name: 'John Doe',
            validDate: '12/25',
          },
          {
            id: 'next_card_id',
            number: '9876 5432 1098 7654',
            name: 'Jane Doe',
            validDate: '12/25',
          },
        ],
      },
    }),
  };
});

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

    const { getByTestId } = render(<PayScreen  />);

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

    const toastShowMock = jest.fn();
    Toast.show = toastShowMock;

    const { getByTestId } = render(<PayScreen  />);

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
    const { getByTestId } = render(<PayScreen  />);
    const nextCardElement = getByTestId('payScreen_nextCard_button');
    expect(nextCardElement).toBeDefined();
    fireEvent.press(nextCardElement);
    const nextCardElementNewRender = getByTestId('payScreen_nextCard_button');
    expect(nextCardElementNewRender).toBeDefined();
  });
});
