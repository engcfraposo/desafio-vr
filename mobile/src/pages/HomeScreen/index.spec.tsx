import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '.';
import { useNavigation } from '@react-navigation/native';

// Mock the navigation prop
jest.mock('@react-navigation/native');

describe('HomeScreen', () => {
  test('renders correctly with specified title and buttons', () => {
    const { getByTestId, getByText } = render(<HomeScreen />);

    const container = getByTestId('loginScreen');
    expect(container).toBeDefined();

    const title = getByText('Wallet Test');
    expect(title).toBeDefined();

    const buttonMyCards = getByText('Meus Cartões');
    expect(buttonMyCards).toBeDefined();

    const buttonSubscribeCard = getByText('Cadastrar Cartão');
    expect(buttonSubscribeCard).toBeDefined();
  });
  it('navigates to CardListScreen when "Meus Cartões" button is pressed', () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

    const { getByTestId } = render(<HomeScreen />);
    const MyCardButton = getByTestId('loginScreen-button-#12C2E9-#fff');

    fireEvent.press(MyCardButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('CardListScreen');
  });

  it('navigates to AddCardScreen when "Cadastrar Cartão" button is pressed', () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

    const { getByTestId } = render(<HomeScreen />);
    const subscribeCardButton = getByTestId('loginScreen-button-#A5FF32-#000');

    fireEvent.press(subscribeCardButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('AddCardScreen');
  });
});
