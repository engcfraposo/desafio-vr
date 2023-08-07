import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddCardScreen from '.';
import thunk from 'redux-thunk';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../../common/zod';
import { newForm } from '../../store/cards';
import { postCardThunk } from '../../store/cards/thunk';
import { validationSchema } from '../../common/zod';

// Mocking navigation object
jest.mock('@react-navigation/native')

// Mock the Redux store
const mockStore = configureStore([thunk]);

jest.mock('../../common/zod', ()=>{
  return {
    validationSchema: {
      parse: jest.fn()
    }
  }
})

const mockPostCardThunk = jest.fn();
jest.mock('../../store/cards/thunk', () => {
  return {
    postCardThunk:  mockPostCardThunk,
  }
});


describe('AddCardScreen', () => {
  test('renders correctly', () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate })
    const initialState = {
      cards: {
        post: '',
        loading: false,
      },
    };
    const store = mockStore(initialState);
  ;
    const { getByTestId } = render(
      <Provider store={store}>
        <AddCardScreen />
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
    const buttonText = getByTestId('addCardScreen-buttonText-#12C2E9-#fff');
    expect(buttonText.children[0]).toContain('avançar');

    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toHaveLength(1);
    expect(dispatchedActions[0]).toEqual(newForm());
  });

  test('disables button on invalid form input', () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    const initialState = {
      cards: {
        post: '',
        loading: false,
      },
    };

    const store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <AddCardScreen  />
      </Provider>
    );

    // Get the button
    const button = getByTestId('addCardScreen-button-#12C2E9-#fff');

    fireEvent.press(button);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
  test('handles form submission correctly', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    const initialState = {
      cards: {
        post: '',
        loading: false,
      },
    };
    const store = mockStore(initialState);

    // Render the component
    const { getByTestId } = render(
      <Provider store={store}>
        <AddCardScreen />
      </Provider>
    );

    // Fill in the form fields
    const numberInput = getByTestId('addCardScreen-field-number');
    fireEvent.changeText(numberInput, '1234 5678 9012 3456');

    const nameInput = getByTestId('addCardScreen-field-name');
    fireEvent.changeText(nameInput, 'John Doe');

    const validDateInput = getByTestId('addCardScreen-field-validDate');
    fireEvent.changeText(validDateInput, '12/24');

    const cvvInput = getByTestId('addCardScreen-field-cvv');
    fireEvent.changeText(cvvInput, '123');

    // Get the button
    const button = getByTestId('addCardScreen-button-#12C2E9-#fff');
    fireEvent.press(button);

    (validationSchema.parse as jest.Mock).mockResolvedValue({
      number:'1234 5678 9012 3456',
      validDate: '12/24',
      cvv: '123',
      name: 'Joe Doe'
    });


    fireEvent.press(button);
    expect(validationSchema.parse).toHaveBeenCalled()
  });
});
