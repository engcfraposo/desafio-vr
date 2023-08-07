import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CardListScreen from '.';

// Mocking navigation object
const navigation = {
  navigate: jest.fn(),
};

// Mock the Redux store
const mockStore = configureStore([thunk]);

describe('CardListScreen', () => {
  test('renders correctly with no cards', () => {
    const initialState = {
      cards: {
        cards: [],
      },
    };
    const store = mockStore(initialState);

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <CardListScreen navigation={navigation} />
      </Provider>
    );

    // Check if the Lottie animation is rendered
    const lottieAnimation = getByTestId('cardListScreen-walletAnimation');
    expect(lottieAnimation).toBeDefined();

    // Check if the error message is rendered
    const errorMessage = getByText('Ops... não encontramos o seu cartão');
    expect(errorMessage).toBeDefined();
  });

  test('renders correctly with four card', () => {
    const initialState = {
      cards: {
        cards: [
          {
            id: 'card-id-1',
            number: '1234 5678 9012 3456',
            name: 'John Doe',
            validDate: '12/25',
            cvv: '123',
          },
          {
            id: 'card-id-2',
            number: '1234 5678 9012 3456',
            name: 'John Doe',
            validDate: '12/25',
            cvv: '123',
          },
          {
            id: 'card-id-3',
            number: '1234 5678 9012 3456',
            name: 'John Doe',
            validDate: '12/25',
            cvv: '123',
          },
          {
            id: 'card-id-4',
            number: '1234 5678 9012 3456',
            name: 'John Doe',
            validDate: '12/25',
            cvv: '123',
          },
          // Add more mock cards if needed
        ],
      },
    };
    const store = mockStore(initialState);

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <CardListScreen navigation={navigation} />
      </Provider>
    );

    // Check if the swiper component is rendered
    const swiperComponent = getByTestId('cardListScreen-swiper');
    expect(swiperComponent).toBeDefined();

    // Check if the "usar este cartão" text is rendered
    const buttonText = getByText('usar este cartão');
    expect(buttonText).toBeDefined();
  });

  test('renders correctly with a card', () => {
    const initialState = {
      cards: {
        cards: [
          {
            id: 'card-id-1',
            number: '1234 5678 9012 3456',
            name: 'John Doe',
            validDate: '12/25',
            cvv: '123',
          },
          // Add more mock cards if needed
        ],
      },
    };
    const store = mockStore(initialState);

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <CardListScreen navigation={navigation} />
      </Provider>
    );

    // Check if the swiper component is rendered
    const swiperComponent = getByTestId('cardListScreen-swiper');
    expect(swiperComponent).toBeDefined();

    // Check if the "usar este cartão" text is rendered
    const buttonText = getByText('usar este cartão');
    expect(buttonText).toBeDefined();
  });

  test('navigates to PayScreen on card tap', () => {
    const initialState = {
      cards: {
        cards: [
          {
            id: 'card-id-1',
            number: '1234 5678 9012 3456',
            name: 'John Doe',
            validDate: '12/25',
            cvv: '123',
          },
          // Add more mock cards if needed
        ],
      },
    };
    const store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <CardListScreen navigation={navigation} />
      </Provider>
    );

    // Tap on the first card
    const firstCard = getByTestId('cardListScreen-card');
    fireEvent(firstCard, 'onTapCard', 0);

    // Check if navigation.navigate was called with the correct argument
    expect(navigation.navigate).toHaveBeenCalledWith('PayScreen', {
      id: 'card-id-1',
      cards: initialState.cards.cards,
    });
  });
});
