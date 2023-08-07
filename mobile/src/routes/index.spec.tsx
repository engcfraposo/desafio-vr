import { render, fireEvent} from '@testing-library/react-native';
import Routes, { commonScreenOptions } from '.';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([thunk]);

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('Routes component', () => {
  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
      goBack: mockGoBack,
    });
  });
  afterEach(()=>{
    jest.clearAllMocks();
  })
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
      ],
    },
  };
  const store = mockStore(initialState);
  it('renders HomeScreen by default', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    );
    const homeScreenText = getByText('Wallet Test');
    expect(homeScreenText).toBeTruthy();
  });

  it('navigates pressed on CardListScreen', () => {
    const { getByTestId } = render(
      <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      </Provider>
    );
    const button = getByTestId('loginScreen-button-#12C2E9-#fff');
    fireEvent.press(button);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('navigates pressed on AddCardScreen', () => {
    const { getByTestId } = render(
      <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      </Provider>
    );
    const button = getByTestId('loginScreen-buttonText-#A5FF32-#000');
    fireEvent.press(button);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('returns the correct header options', () => {
    const headerOptions = commonScreenOptions();
    expect(headerOptions.headerTransparent).toBe(true);
    expect(headerOptions.headerTitleAlign).toBe('center');
    expect(headerOptions.headerBackVisible).toBe(false);

    // Mock the HeaderButton component (if needed) to avoid rendering issues
    // You can use the jest.mock function similar to how you mocked @react-navigation/native

    // Now, you can also test the onPress events of the HeaderButton components
    const { getByTestId } = render(
      <NavigationContainer>
        {headerOptions.headerLeft()}
        {headerOptions.headerRight()}
      </NavigationContainer>
    );

    // Get the backButton element and the addButton element using their testIds
    const backButton = getByTestId('backButton');
    const addButton = getByTestId('addButton');

    // Simulate button presses and check if the corresponding navigation functions are called
    fireEvent.press(backButton);
    expect(mockGoBack).toHaveBeenCalledTimes(1);

    fireEvent.press(addButton);
    expect(mockNavigate).toHaveBeenCalledWith('AddCardScreen');
  });
});
