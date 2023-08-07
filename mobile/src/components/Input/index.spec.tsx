import Input from '.';
import { fireEvent, render } from '@testing-library/react-native';

// Mock the theme object to prevent errors during rendering
jest.mock('../../common/theme',
() => (
  {
    theme:
      {
        regular:
          {
            fontFamily: 'PTSansCaption_400Regular',
          }
      }
  }
));

describe('Input', () => {
  test('renders correctly with label, placeholder, and value', () => {
    const label = 'Test Label';
    const placeholder = 'Test Placeholder';
    const value = 'Test Value';

    const onChangeMock = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChangeMock}
        name="testName"
      />
    );

    const labelElement = getByText(label);
    expect(labelElement).toBeDefined();

    const inputElement = getByPlaceholderText(placeholder);
    expect(inputElement).toBeDefined();
    expect(inputElement.props.value).toBe(value);
  });

  test('handles input change and calls onChange correctly', () => {
    const label = 'Test Label';
    const placeholder = 'Test Placeholder';
    const value = '';
    const name = 'testName';

    const onChangeMock = jest.fn();

    const { getByPlaceholderText } = render(
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChangeMock}
        name={name}
      />
    );

    const inputElement = getByPlaceholderText(placeholder);
    expect(inputElement).toBeDefined();

    // Simulate input change
    const testInputValue = 'Test Input Value';
    fireEvent.changeText(inputElement, testInputValue);

    // Verify if masked value is set correctly
    expect(inputElement.props.value).toBe(testInputValue);

    // Verify if onChange function is called with the correct arguments
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(name, testInputValue);
  });

  test('handles input change for "number" name', () => {
    const label = 'Card Number';
    const placeholder = 'Enter card number';
    const value = '';
    const name = 'number';

    const onChangeMock = jest.fn();

    const { getByPlaceholderText } = render(
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChangeMock}
        name={name}
      />
    );

    const inputElement = getByPlaceholderText(placeholder);
    expect(inputElement).toBeDefined();

    // Simulate input change with invalid characters
    const testInputValue = '1234567812345678';
    fireEvent.changeText(inputElement, testInputValue);

    // Verify if masked value is set correctly
    expect(inputElement.props.value).toBe('1234 5678 1234 5678');

    // Verify if onChange function is called with the correct arguments
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(name, '1234567812345678');
  });

  test('handles input change for "validDate" name', () => {
    const label = 'Valid Date';
    const placeholder = 'MM/YY';
    const value = '';
    const name = 'validDate';

    const onChangeMock = jest.fn();

    const { getByPlaceholderText } = render(
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChangeMock}
        name={name}
      />
    );

    const inputElement = getByPlaceholderText(placeholder);
    expect(inputElement).toBeDefined();

    // Simulate input change with invalid characters and too many digits
    const testInputValue = '11223344556677889900';
    fireEvent.changeText(inputElement, testInputValue);

    // Verify if masked value is set correctly
    expect(inputElement.props.value).toBe('11/22');

    // Verify if onChange function is called with the correct arguments
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(name, '11/22');
  });

  test('handles input change for "cvv" name', () => {
    const label = 'CVV';
    const placeholder = 'CVV';
    const value = '';
    const name = 'cvv';

    const onChangeMock = jest.fn();

    const { getByPlaceholderText } = render(
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChangeMock}
        name={name}
      />
    );

    const inputElement = getByPlaceholderText(placeholder);
    expect(inputElement).toBeDefined();

    // Simulate input change with invalid characters and too many digits
    const testInputValue = '12 34 567';
    fireEvent.changeText(inputElement, testInputValue);

    // Verify if masked value is set correctly
    expect(inputElement.props.value).toBe('123');

    // Verify if onChange function is called with the correct arguments
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(name, '123');
  });

  // Add more tests for other scenarios and maskedValue handling if needed
});
