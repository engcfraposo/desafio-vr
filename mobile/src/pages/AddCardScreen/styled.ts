import styled from 'styled-components/native';
import { verticalScale } from '../../common/utils/dimensions';

export const RowContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: center;
  width: 48%;
  max-width: ${verticalScale(600)}px;
  margin: ${verticalScale(10)}px 0;
`;
