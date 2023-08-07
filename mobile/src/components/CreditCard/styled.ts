import styled from 'styled-components/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../common/utils/dimensions';

export const Card = styled.View<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: ${verticalScale(20)}px ${horizontalScale(20)}px;
  height: ${verticalScale(220)}px;
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(25)}px;
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

export const Title = styled(Line)`
  font-size: ${moderateScale(18)}px;
  margin-bottom: 5px;
`
