import CreditCard from '.';
import { render } from '@testing-library/react-native';

const testCard = {
  id: '12344555',
  number: '1234567890123456',
  name: 'John Doe',
  validDate: '12/25',
  cvv: '000'
};

describe('<CreditCard />', ()=>{
  describe('CreditCard', () => {
    test('renders correctly with Green Card type', () => {
      const card = {
        ...testCard,
        number: '1234567890123450', // Last digit 0, should be Green Card
      };
      const { getByTestId } = render(<CreditCard card={card} testId="credit-card" />);
      expect(getByTestId('credit-card-card').props.style.backgroundColor).toBe('#A5FF32');
      expect(getByTestId('credit-card-card-title').props.children).toBe('Green Card');
    });

    test('renders correctly with Platinum Card type', () => {
      const card = {
        ...testCard,
        number: '1234567890123456', // Last digit 6, should be Platinum Card
      };
      const { getByTestId } = render(<CreditCard card={card} testId="credit-card" />);
      expect(getByTestId('credit-card-card').props.style.backgroundColor).toBe('gray');
      expect(getByTestId('credit-card-card-title').props.children).toBe('Platinum Card');
    });

    test('renders correctly with Black Card type', () => {
      const card = {
        ...testCard,
        number: '1234567890123449', // Last digit 9, should be Black Card
      };
      const { getByTestId } = render(<CreditCard card={card} testId="credit-card" />);
      expect(getByTestId('credit-card-card').props.style.backgroundColor).toBe('#000');
      expect(getByTestId('credit-card-card-title').props.children).toBe('Black Card');
    });

    test('displays masked card number', () => {
      const { getByTestId } = render(<CreditCard card={testCard} testId="credit-card" />);
      expect(getByTestId('credit-card-card-number').props.children).toBe('****  ****  ****  3456');
    });

    test('renders correctly with invalid card number', () => {
      const card = {
        ...testCard,
        number: '1234567890abcde', // Invalid characters, should default to Black Card
      };
      const { getByTestId } = render(<CreditCard card={card} testId="credit-card" />);
      expect(getByTestId('credit-card-card').props.style.backgroundColor).toBe('#000');
      expect(getByTestId('credit-card-card-title').props.children).toBe('Black Card');
    });
    test('renders correctly with short card number', () => {
      const card = {
        ...testCard,
        number: '1234', // Too short, should default to Black Card
      };
      const { getByTestId } = render(<CreditCard card={card} testId="credit-card" />);
      expect(getByTestId('credit-card-card').props.style.backgroundColor).toBe('#A5FF32');
      expect(getByTestId('credit-card-card-title').props.children).toBe('Green Card');
    });
  });


})
