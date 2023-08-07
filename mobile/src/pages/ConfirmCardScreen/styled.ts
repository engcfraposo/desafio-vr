import styled from "styled-components/native";
import { horizontalScale, moderateScale } from "../../common/utils/dimensions";

export const SubTitle = styled.Text`
  font-size: ${horizontalScale(20)}px;
  line-height: ${moderateScale(22)}px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #FFFFFF;
`;
