import HeaderButton from '.';
import { fireEvent, render } from '@testing-library/react-native';

// Mock the Ionicons component since we don't need to test its functionality
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('HeaderButton', () => {
  test('renders correctly with specified icon name and testID', () => {
    const onPressMock = jest.fn();
    const iconName = 'ios-heart'; // Specify the icon name here

    const { getByTestId } = render(
      <HeaderButton onPress={onPressMock} name={iconName} testId="header-button" />
    );

    const buttonContainer = getByTestId('header-button');
    expect(buttonContainer).toBeDefined();

    // Simulate button press and check if onPress function is called
    fireEvent.press(buttonContainer);
    expect(onPressMock).toHaveBeenCalledTimes(1);

    // Check if Ionicons component is rendered with the correct props
    const iconComponent = getByTestId('header-button_ios-heart');
    expect(iconComponent).toBeDefined();
    expect(iconComponent.props.name).toBe(iconName as any);
    expect(iconComponent.props.size).toBe(24);
    expect(iconComponent.props.color).toBe('#12C2E9');
  });
});
