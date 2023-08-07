import styled from 'styled-components/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../common/utils/dimensions';
import { Dimensions } from 'react-native';

export const Card = styled.View<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: ${verticalScale(30)}px ${horizontalScale(15)}px;
  height: ${verticalScale(Dimensions.get('window').width/2)}px;
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(15)}px;
  width: 100%;
  z-index: 20;
  border: 0.4px solid #f0f0f0;
`;

export const Title = styled.Text<{color: string}>`
  font-size: 18px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: ${({color}) => color};
`

export const Name = styled.Text<{color: string}>`
  margin-top: 20px;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: ${({color}) => color};
`

export const Number = styled.Text<{color: string}>`
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: ${({color}) => color};
`

export const ValidDate = styled.Text<{color: string}>`
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: ${({color}) => color};
`
