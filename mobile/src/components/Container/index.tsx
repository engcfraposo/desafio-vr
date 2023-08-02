import React, { Fragment, ReactNode } from 'react';
import * as S from './styled';

interface ContainerProps { 
    testID: string, 
    title: string, 
    children: ReactNode
}

const Container = ({ title, children, testID }:ContainerProps) => {
  return (
    <Fragment>
        <S.Container testID={testID}>
        <S.Title testID={`${testID}_title`}>{title}</S.Title>
            {children}
            <S.TopLeftSquare testID={`${testID}_topLeftSquare`} />
            <S.BottomRightSquare testID={`${testID}_bottomRightSquare`} />
        </S.Container>
    </Fragment>
  );
}

export default Container;