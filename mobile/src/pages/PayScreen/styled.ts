import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const CardView = styled.View`
  flex: 0.75;
  width: ${Dimensions.get('window').width - 60}px;
  justify-content: space-evenly;
`;

export const NextCardView = styled.TouchableOpacity`
  bottom: -120px;
  width: ${Dimensions.get('window').width - 60}px;
  position: absolute;
  opacity: 0.5;
`
