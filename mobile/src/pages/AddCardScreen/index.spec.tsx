import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddCardScreen from '.';
import { postCardThunk } from '../../store/cards/thunk';

// Mocking navigation object
const navigation = {
  navigate: jest.fn(),
};

// Mock the Redux store
const mockStore = configureStore([]);

jest.mock('../../store/cards/thunk', () => ({
  postCardThunk: jest.fn(),
}));

describe('AddCardScreen', () => {
  test('renders correctly', () => {
    const initialState = {
      cards: {
        post: '',
        loading: false,
      },
    };
    const store = mockStore(initialState);

    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <AddCardScreen navigation={navigation} />
      </Provider>
    );

    // Check if the input fields are rendered correctly
    const numberInput = getByTestId('addCardScreen-inputContainer-number');
    expect(numberInput).toBeDefined();

    const nameInput = getByTestId('addCardScreen-inputContainer-name');
    expect(nameInput).toBeDefined();

    const validDateInput = getByTestId('addCardScreen-inputContainer-validDate');
    expect(validDateInput).toBeDefined();

    const cvvInput = getByTestId('addCardScreen-inputContainer-cvv');
    expect(cvvInput).toBeDefined();

    // Check if the button is rendered with the correct text
    const button = getByTestId('addCardScreen-buttonText-#12C2E9-#fff');
    expect(button.children[0]).toContain('avançar');
  });

  test('enables button on valid form input', async () => {
    const initialState = {
      cards: {
        post: '',
        loading: false,
      },
    };
    const store = mockStore(initialState);

    (postCardThunk as unknown as jest.Mock).mockResolvedValueOnce({});

    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <AddCardScreen navigation={navigation} />
      </Provider>
    );

    // Get input fields and button
    const numberInput = getByTestId('addCardScreen-inputContainer-number');
    const nameInput = getByTestId('addCardScreen-inputContainer-name');
    const validDateInput = getByTestId('addCardScreen-inputContainer-validDate');
    const cvvInput = getByTestId('addCardScreen-inputContainer-cvv');
    const button = getByTestId('addCardScreen-button-#12C2E9-#fff');

    // Input valid data into the fields
    fireEvent.changeText(numberInput, '1234 5678 9012 3456');
    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(validDateInput, '12/25');
    fireEvent.changeText(cvvInput, '123');
    fireEvent.press(button);

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Check if the button is enabled
      expect(postCardThunk).toHaveBeenCalledWith({
        number: '1234 5678 9012 3456',
        name: 'John Doe',
        validDate: '12/25',
        cvv: '123',
      });

      // Check if the navigation.navigate was called with the correct argument
      expect(navigation.navigate).toHaveBeenCalledWith('ConfirmCardScreen', {
        number: '1234 5678 9012 3456',
        name: 'John Doe',
        validDate: '12/25',
        cvv: '123',
      });
    });
  });

  test('disables button on invalid form input', () => {
    const initialState = {
      cards: {
        post: '',
        loading: false,
      },
    };
    const store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <AddCardScreen navigation={navigation} />
      </Provider>
    );

    // Get the button
    const button = getByTestId('addCardScreen-button-#12C2E9-#fff');

    fireEvent.press(button);

    expect(navigation.navigate).not.toHaveBeenCalled();
  });
});
