import styled from 'styled-components/native';

import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const InputWrapper = styled.View`
  flex-direction: row;
  width: ${`${widthPercentageToDp('85%')}px`};
  margin-top: ${`${heightPercentageToDp('2%')}px`};
  align-items: center;
  justify-content: center;
  background: white;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 8px;
  height: 60px;
  border: 2px solid black;
`;

export const LabelWrapper = styled.View`
  flex: 1;
`;

export const StyledTextInput = styled.TextInput``;

export const Label = styled.Text`
  font-family: 'RobotoBold';
  position: absolute;
  margin-top: -25px;
  margin-left: -30px;
  background: white;
  padding-left: 2px;
  padding-right: 2px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const IconView = styled.View`
  margin-right: 10px;
`;
