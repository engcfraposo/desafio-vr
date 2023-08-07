import React, { Fragment, ReactNode } from 'react';
import * as CS from "../common/styled";
import * as S from './styled';
import { Platform } from 'react-native';
import { theme } from '../../common/theme';


interface Props {
  testId: string;
  title: string;
  children: ReactNode;
}

const Container = ({ title, children, testId }:Props) => {
  return (
    <Fragment>
      <CS.Container testID={testId} ios={Platform.OS === 'ios'}>
        <S.Title testID={`${testId}_title`} style={theme.regular} >
          {title}
        </S.Title>
        {children}
        <S.TopLeftSquare testID={`${testId}_topLeftSquare`} />
        <S.BottomRightSquare testID={`${testId}_bottomRightSquare`} />
      </CS.Container>
    </Fragment>
  );
};

export default Container;
