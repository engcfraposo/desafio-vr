import React from 'react';
import * as S from "./styled"

interface ButtonProps {
    background: string,
    color: string, 
    text: string,
    testId: string 
}

const Button = ({background, color, text, testId }:ButtonProps) => {
  return (
    <S.Button  
        color={background} 
        testID={`${testId}-button-${background}-${color}`}
    >
        <S.ButtonText 
            testID={`${testId}-buttonText-${background}-${color}`} 
            color={color}>
                {text}
        </S.ButtonText>
    </S.Button>
  );
}

export default Button;