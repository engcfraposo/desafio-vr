import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #142995;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  line-height: 32px;
  margin-bottom: 20px;
`;

const Square = styled.View`
  position: absolute;
  width: 350px;
  height: 240px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 35px;
`;

export const TopLeftSquare = styled(Square)`
  top: -60px;
  right: 155px;
  transform: rotate(-45deg);
`;

export const BottomRightSquare = styled(Square)`
  bottom: -60px;
  left: 165px;
  transform: rotate(-45deg);
`;
