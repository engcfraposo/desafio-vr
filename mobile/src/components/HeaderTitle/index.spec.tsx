import HeaderTitle from '.';
import { render } from '@testing-library/react-native';

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

describe('HeaderTitle', () => {
  test('renders correctly with specified color and title', () => {
    const title = 'Test Header';
    const color = '#FF5733';

    const { getByTestId } = render(<HeaderTitle testId='test' color={color} title={title} />);

    const headerContainer = getByTestId('test');
    expect(headerContainer).toBeDefined();

    const headerTitleText = getByTestId("test-text-#FF5733");
    expect(headerTitleText).toBeDefined();
    expect(headerTitleText.children[0]).toEqual(title)
  });
});
