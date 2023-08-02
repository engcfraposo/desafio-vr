import { render } from '@testing-library/react-native';
import Button from '.';

describe('Button', () => {
  const background = '#ff0000';
  const color = '#ffffff';
  const text = 'Click Me';
  const testId='testId'

  it('renders button with correct background, color, and text', () => {
    const { getByTestId, getByText } = render(
      <Button 
        background={background} 
        color={color} 
        text={text} 
        testId={testId}
      />
    );

    const button = getByTestId(`${testId}-button-${background}-${color}`);
    const buttonText = getByText(text);

    expect(button).toBeDefined();
    expect(button.props.style.backgroundColor).toBe(background);
    expect(buttonText).toBeDefined();
    expect(buttonText.props.style.color).toBe(color);
    expect(buttonText.props.children).toBe(text);
  });
});
