import * as S from './styled';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onPress: () => void;
  name: string;
  testId: string
}

const HeaderButton = ({ onPress, name, testId }:Props) => {
  return (
    <S.ButtonContainer
      onPress={onPress}
      testID={testId}
    >
      <Ionicons
        name={name as any}
        size={24}
        color="#12C2E9"
        testID={`${testId}_${name}`}
      />
    </S.ButtonContainer>
  );
};

export default HeaderButton;
