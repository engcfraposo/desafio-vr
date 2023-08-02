import styled from "styled-components/native";

export const Button = styled.TouchableOpacity<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: 10px 20px;
  height: 55px;
  border-radius: 8px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  width: 100%; /* O botão ocupará todo o espaço horizontal disponível */
`;


export const ButtonText = styled.Text<{ color: string}>`
  color: ${({ color }) => color};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
`;
