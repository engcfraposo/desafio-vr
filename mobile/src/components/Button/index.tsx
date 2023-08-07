import * as S from './styled';
import { theme } from '../../common/theme';
import { TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  colors?: 'primary' | 'secondary';
  text: string;
  testId: string;
  onPress: () => void;
  disabled?: boolean;
}

export const buttonStyles = {
  primary: { background: '#12C2E9', color: '#fff' },
  secondary: { background: '#A5FF32', color: '#000' },
  disabled: { background: '#EEEEEE', color: '#BBBBBB' },
};

const Button = ({
  colors,
  text,
  testId,
  onPress,
  disabled,
  ...props
}: ButtonProps) => {
  const buttonStyle = colors ? buttonStyles[colors] : buttonStyles.primary;

  return (
    <S.Button
      color={
        disabled ? buttonStyles.disabled.background : buttonStyle.background
      }
      testID={`${testId}-button-${buttonStyle.background}-${buttonStyle.color}`}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <S.ButtonText
        color={disabled ? buttonStyles.disabled.color : buttonStyle.color}
        testID={`${testId}-buttonText-${buttonStyle.background}-${buttonStyle.color}`}
        style={theme.regular}
      >
        {text}
      </S.ButtonText>
    </S.Button>
  );
};

export default Button;
