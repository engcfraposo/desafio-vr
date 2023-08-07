import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const Text = styled.Text`
  font-size: 18px;
  line-height: 18px;
  color: #FFFFFF;
  margin-top: 120px;
`;

export const CardListFooter = styled.View`
  margin-top: 120px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CardList = styled.View`
  flex: 1;
  width: ${Dimensions.get('window').width}px;
`;
