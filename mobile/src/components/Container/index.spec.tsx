import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import Container from '.';

describe('Container', () => {
  const testID = 'test-container';
  const title = 'Test Container';
  const children = <Text>Test Content</Text>;
  it('renders Container with correct title and children', () => {
    const { getByTestId, getByText } = render(
      <Container testID={testID} title={title}>
        {children}
      </Container>
    );

    const container = getByTestId(testID);
    const titleElement = getByTestId(`${testID}_title`);
    const topLeftSquare = getByTestId(`${testID}_topLeftSquare`);
    const bottomRightSquare = getByTestId(`${testID}_bottomRightSquare`);

    expect(container).toBeDefined();
    expect(titleElement).toBeDefined();
    expect(topLeftSquare).toBeDefined();
    expect(bottomRightSquare).toBeDefined();

    expect(titleElement.props.children).toBe(title);
    expect(getByText('Test Content')).toBeTruthy();
  });
});

