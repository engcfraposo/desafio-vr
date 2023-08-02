import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '.';

// Mock the Button and Container components
jest.mock('../../components/Button', () => 'MockedButton');
jest.mock('../../components/Container', () => 'MockedContainer');

describe('HomeScreen', () => {
  it('renders correctly with two Button components inside a Container', () => {
    const { getByTestId, getByText } = render(<HomeScreen />);

    const container = getByTestId('loginScreen');
    const containerTitle = getByTestId('loginScreen_title');
    const button1 = getByText('Meus Cartões');
    const button2 = getByText('Cadastrar Cartão');

    expect(container).toBeDefined();
    expect(containerTitle).toBeDefined();
    expect(button1).toBeDefined();
    expect(button2).toBeDefined();
  });
});
