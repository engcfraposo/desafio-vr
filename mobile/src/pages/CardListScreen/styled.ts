import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { verticalScale, moderateScale } from "../../common/utils/dimensions";

export const Text = styled.Text`
  font-size: ${moderateScale(18)}px;
  line-height: ${moderateScale(18)}px;
  color: #FFFFFF;
  margin-top: ${verticalScale(120)}px;
`;

export const CardListFooter = styled.View`
  margin-top: ${verticalScale(120)}px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CardList = styled.View`
  flex: 1;
  width: ${Dimensions.get('window').width}px;
`;
