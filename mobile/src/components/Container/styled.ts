import styled from 'styled-components/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../common/utils/dimensions';


export const Title = styled.Text`
  color: #fff;
  font-size: ${moderateScale(28)}px;
  line-height: ${horizontalScale(32)}px;
  margin-bottom: ${verticalScale(20)}px;
`;

const Square = styled.View`
  position: absolute;
  width: ${moderateScale(350)}px;
  height: ${moderateScale(240)}px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${moderateScale(35)}px;
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
