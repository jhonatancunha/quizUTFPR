import styled from 'styled-components';
import { IconButton, Title, Text, Button } from 'react-native-paper';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const StyledIconButton = styled(IconButton)`
  margin-top: ${`${heightPercentageToDp('6%')}px`};
  align-self: flex-start;
  margin-left: -7px;
`;

export const StyledTitle = styled(Title)`
  align-self: flex-start;
  font-size: ${({ fontSize }) => fontSize + 12}px;
  font-family: 'RobotoBlack';
  color: white;
`;

export const StyledText = styled(Text)`
  align-self: flex-start;
  font-size: ${({ fontSize }) => fontSize - 4}px;
  font-family: 'RobotoRegular';
  color: white;
`;