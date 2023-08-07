import Container from '.';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('<Container />', ()=>{
  test('Container renders correctly with title and children', () => {
    const testID = 'container-test';
    const title = 'Test Container';
    const { getByText, getByTestId } = render(
      <Container testId={testID} title={title}>
        <Text>Content inside the container</Text>
      </Container>
    );

    const containerElement = getByTestId(testID);
    const titleElement = getByText(title);
    const contentElement = getByText('Content inside the container');

    expect(containerElement).toBeDefined();
    expect(titleElement).toBeDefined();
    expect(contentElement).toBeDefined();
  });

  test('Container renders the TopLeftSquare and BottomRightSquare', () => {
    const testID = 'container-test';
    const title = 'Test Container';
    const { getByTestId } = render(
      <Container testId={testID} title={title}>
        <Text>Content inside the container</Text>
      </Container>
    );

    const topLeftSquare = getByTestId(`${testID}_topLeftSquare`);
    const bottomRightSquare = getByTestId(`${testID}_bottomRightSquare`);

    expect(topLeftSquare).toBeDefined();
    expect(bottomRightSquare).toBeDefined();
  });
})
