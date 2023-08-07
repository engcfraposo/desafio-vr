import { render, fireEvent } from '@testing-library/react-native';
import ConfirmCardScreen from '.';
import { Card } from '../../common/zod';

// Mocking navigation object
const navigation = {
  navigate: jest.fn(),
};

const mockCard: Card = {
  number: '1234 5678 9012 3456',
  name: 'John Doe',
  validDate: '12/25',
  cvv: '000',
  id: null
};
describe('ConfirmCardScreen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <ConfirmCardScreen route={{ params: mockCard }} navigation={navigation} />
    );

    // Check if the screen title is rendered
    const title = getByTestId('ConfirmCardScreen_title');
    expect(title.children[0]).toBe('Wallet Test');
    const subtitle = getByTestId('ConfirmCardScreen_subTitle');
    expect(subtitle.children[0]).toBe("cartão cadastrado com sucesso");

    // Check if the credit card type name is rendered
    const cardName = getByTestId('ConfirmCardScreen-card-title');
    expect(cardName.children[0]).toContain("Platinum Card");

    // Check if the credit card owner name is rendered
    const cardOwnerName = getByTestId('ConfirmCardScreen-card-name');
    expect(cardOwnerName.children[0]).toContain(mockCard.name);

    // Check if the masked credit card number is rendered
    const maskedCardNumber = getByTestId('ConfirmCardScreen-card-number');
    expect(maskedCardNumber.children[0]).toContain('****  ****  ****  3456');

    // Check if the valid date is rendered
    const validDate = getByTestId('ConfirmCardScreen-card-validDate');
    expect(validDate.children[0]).toContain(mockCard.validDate);

    // Check if the button is rendered with the correct text
    const button = getByTestId('ConfirmCardScreen-buttonText-#12C2E9-#fff');
    expect(button.children[0]).toContain('avançar');
  });

  test('navigates to CardListScreen on button press', () => {
    const { getByTestId } = render(
      <ConfirmCardScreen route={{ params: mockCard }} navigation={navigation} />
    );

    const button = getByTestId('ConfirmCardScreen-button-#12C2E9-#fff');
    fireEvent.press(button);

    // Check if navigation.navigate was called with the correct argument
    expect(navigation.navigate).toHaveBeenCalledWith('CardListScreen');
  });
});
