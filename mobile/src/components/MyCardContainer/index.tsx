import * as CS from '../common/styled';
import * as S from './styled';
import React, { ReactNode } from 'react';
import { Platform } from 'react-native';
import { theme } from '../../common/theme';

interface Props {
  testId: string;
  children: ReactNode;
}

const MyCardContainer = ({ testId, children }:Props) => {
  return (
    <CS.Container testID={testId} ios={Platform.OS === 'ios'}>
        <S.SquareView>
          <S.SquareText testID={`${testId}-title`} style={theme.regular}>Meus Cartões</S.SquareText>
        </S.SquareView>
        {children}
    </CS.Container>
  );
}

export default MyCardContainer;
