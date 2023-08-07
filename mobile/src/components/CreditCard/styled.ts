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


export const Line = styled.Text<{color: string}>`
  font-size: ${moderateScale(16)}px;
  line-height: ${moderateScale(28)}px;
  display: flex;
  align-items: center;
  color: ${({color}) => color};
`
