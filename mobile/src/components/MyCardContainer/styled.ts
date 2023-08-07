import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const SquareView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: ${Dimensions.get('window').width}px;
  height: 60px;
  background-color: #FFFFFF;
  justify-content: center;
  align-items: center;
  z-index: 20;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

export const SquareText = styled.Text`
  font-size: 20px;
  line-height: 22px;
  color: #12C2E9;
`;
