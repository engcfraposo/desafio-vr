import Button from '.';
import { fireEvent, render } from '@testing-library/react-native';

describe('<Button />', () => {
  test('Primary Button renders correctly', () => {
    const { getByText } = render(<Button colors="primary" text="Click Me" testId="test-button" onPress={() => {}} />);
    const buttonElement = getByText('Click Me');
    expect(buttonElement).toBeDefined();
  });

  test('Primary Button renders correctly without param', () => {
    const { getByText } = render(<Button text="Click Me" testId="test-button" onPress={() => {}} />);
    const buttonElement = getByText('Click Me');
    expect(buttonElement).toBeDefined();
  });

  test('Secondary Button renders correctly', () => {
    const { getByText } = render(<Button colors="secondary" text="Click Me" testId="test-button" onPress={() => {}} />);
    const buttonElement = getByText('Click Me');
    expect(buttonElement).toBeDefined();
  });

  test('Button click fires onPress event when enabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button colors="primary" text="Click Me" testId="test-button" onPress={onPressMock} />);
    const buttonElement = getByText('Click Me');
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test('Button should not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button colors="primary" text="Click Me" testId="test-button" onPress={onPressMock} disabled />);
    const buttonElement = getByText('Click Me');
    fireEvent.press(buttonElement);
    expect(onPressMock).not.toHaveBeenCalled();
  });
})


