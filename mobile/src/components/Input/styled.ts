import styled from 'styled-components/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../common/utils/dimensions';

export const InputContainer = styled.View`
  margin: 5px;
  width: 100%;
  z-index: 20;
`;

export const Label = styled.Text`
  margin-top: ${verticalScale(15)}px;
  font-size: ${moderateScale(14)}px;
  line-height: ${horizontalScale(16)}px;
  color: #bbbbbb;
`;

export const Field = styled.TextInput`
  margin-top: ${verticalScale(10)}px;
  height: ${verticalScale(55)}px;
  border-radius: ${moderateScale(12)}px;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  border-radius: ${moderateScale(6)}px;
  background-color: #fff;
  padding: ${verticalScale(10)}px ${horizontalScale(20)}px;
`;
