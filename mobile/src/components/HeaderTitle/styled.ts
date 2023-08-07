import styled from "styled-components/native";
import {
  moderateScale,
} from '../../common/utils/dimensions';

export const HeaderTitleText = styled.Text<{color: string}>`
  color: ${({color}) => color};
  font-size: ${moderateScale(22)}px;
  line-height: ${moderateScale(24)}px;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
`
