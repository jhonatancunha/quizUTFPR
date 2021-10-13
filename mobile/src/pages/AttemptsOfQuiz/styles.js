import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { StyledButton } from '@components/ButtonGradient/style';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const QuizAttemptsHeader = styled.View`
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('45%')}px;
`;

export const StyledImageBackground = styled.ImageBackground`
  flex: 1;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.red};
`;

export const GoBackButtonWrapper = styled(StyledButton).attrs({
  colors: ['#4B24B1', '#3b1b96'],
})`
  margin-top: ${Constants.statusBarHeight + 10}px;
  margin-left: 25px;
  align-items: center;
  width: 40px;
  height: 40px;
`;

export const StyledIconButton = styled.Text``;

export const BottomDecoration = styled.View`
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('5%')}px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background: #eaeaf5;
`;

export const Description = styled.View`
  width: ${widthPercentageToDp('100%')}px;
  margin-left: 22px;
`;

export const StyledText = styled.Text`
  font-family: ${({ title }) => (title ? 'PoppinsBold' : 'PoppinsSemiBold')};
  font-size: ${({ title }) =>
    ({ theme }) =>
      title ? theme.fontSize + 10 : theme.fontSize}px;
  color: ${({ title }) =>
    ({ theme }) =>
      title ? theme.color.purple : theme.color.black};
`;

export const Divider = styled.View`
  width: ${widthPercentageToDp('92%')}px;
  height: ${heightPercentageToDp('0.2%')}px;
  margin-top: ${heightPercentageToDp('2%')}px;
  background: ${({ theme }) => theme.color.whiteGrey};
  align-self: center;
`;
