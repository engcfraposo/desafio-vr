import styled from 'styled-components/native';
import {
  horizontalScale,
} from '../../common/utils/dimensions';

export const Container = styled.SafeAreaView<{ ios: boolean }>`
  flex: 1;
  background-color: #142995;
  justify-content: center;
  align-items: center;
  padding: 0 ${horizontalScale(30)}px;
  ${({ ios }) => ios && `padding-top: 50px;`}
`;
