import * as S from './styled';
import { theme } from '../../common/theme';

interface Props {
  color: string;
  title: string;
  testId: string
}

const HeaderTitle = ({color, title, testId}:Props) => (
  <S.HeaderContainer testID={testId}>
    <S.HeaderTitleText
      testID={`${testId}-text-${color}`}
      color={color}
      style={theme.regular}>
        {title}
    </S.HeaderTitleText>
  </S.HeaderContainer>
);

export default HeaderTitle;
