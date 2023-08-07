import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '.';

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

describe('HomeScreen', () => {
  test('renders correctly with specified title and buttons', () => {
    const { getByTestId, getByText } = render(<HomeScreen navigation={mockNavigation} />);

    const container = getByTestId('loginScreen');
    expect(container).toBeDefined();

    const title = getByText('Wallet Test');
    expect(title).toBeDefined();

    const buttonMeusCartoes = getByText('Meus Cartões');
    expect(buttonMeusCartoes).toBeDefined();

    const buttonCadastrarCartao = getByText('Cadastrar Cartão');
    expect(buttonCadastrarCartao).toBeDefined();
  });

  test('navigates to CardListScreen when "Meus Cartões" button is pressed', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);

    const buttonMeusCartoes = getByText('Meus Cartões');
    expect(buttonMeusCartoes).toBeDefined();

    fireEvent.press(buttonMeusCartoes);

    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('CardListScreen');
  });

  test('navigates to AddCardScreen when "Cadastrar Cartão" button is pressed', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);

    const buttonCadastrarCartao = getByText('Cadastrar Cartão');
    expect(buttonCadastrarCartao).toBeDefined();

    fireEvent.press(buttonCadastrarCartao);

    expect(mockNavigation.navigate).toHaveBeenCalledTimes(2);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AddCardScreen');
  });
});
