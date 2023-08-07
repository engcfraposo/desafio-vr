import React from 'react';
import { render } from '@testing-library/react-native';
import MyCardContainer from '.';

// Mock the Platform module to set it to 'ios'
jest.mock('react-native', () => {
  const Platform = jest.requireActual('react-native');
  Platform.OS = 'ios';
  return Platform;
});

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

describe('MyCardContainer', () => {
  test('renders correctly with specified testID and children', () => {
    const testId = 'my-card-container';
    const testChildren = <></>; // Add your test children here

    const { getByTestId, getByText } = render(
      <MyCardContainer testId={testId}>{testChildren}</MyCardContainer>
    );

    const container = getByTestId(testId);
    expect(container).toBeDefined();

    // Verify if the SquareText element is rendered with the correct style and content
    const squareText = getByText('Meus Cartões');
    expect(squareText).toBeDefined();
  });
});
