import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '.';

// Mock the LottieView component to prevent errors during rendering
jest.mock('lottie-react-native', () => 'LottieView');

describe('SplashScreen', () => {
  test('renders correctly with LottieViews', () => {
    const { getByTestId } = render(<SplashScreen />);
    const splashScreenContainer = getByTestId('splashScreen');
    expect(splashScreenContainer).toBeDefined();
    const bottomRightSquare = getByTestId("splashScreen_bottomRightSquare");
    expect(bottomRightSquare).toBeDefined();
    const topLeftSquare = getByTestId("splashScreen_topLeftSquare");
    expect(topLeftSquare).toBeDefined();
    const title = getByTestId("splashScreen_title");
    expect(title).toBeDefined();
    const walletAnimation = getByTestId('splashScreen_wallet');
    expect(walletAnimation).toBeDefined();
    const mainAnimation = getByTestId('splashScreen_animation');
    expect(mainAnimation).toBeDefined();
  });
});
