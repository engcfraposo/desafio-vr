import styled from 'styled-components/native';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../common/utils/dimensions';

export const Button = styled.TouchableOpacity<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: ${verticalScale(10)}px ${horizontalScale(20)}px;
  height: ${verticalScale(55)}px;
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(15)}px;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 20;
`;

export const ButtonText = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
  font-size: ${moderateScale(18)}px;
  line-height: ${horizontalScale(20)}px;
`;
