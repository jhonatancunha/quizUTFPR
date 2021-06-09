import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
// STYLES
import {
  QuestionContainer,
  QuestionWrapper,
  InformationsWrapper,
  Header,
  Footer,
  CurrentQuestion,
  QuestionDescription,
  QuestionImage,
  QuestionText,
  AnswerContainer,
  AnswerText,
  StyledButton,
  ScrollWrapper,
} from './styles';

const fakeAnswers = ['Amarelo', 'Roxo', 'Azul', 'Tijolo'];

const Question = () => {
  const animation = React.useRef(false);
  const { label } = useTheme();

  React.useEffect(() => {
    if (animation) {
      animation.current.play();
    }
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <LottieView
          autoPlay
          loop
          ref={animation}
          style={{
            width: 500,
            height: 500,
          }}
          // eslint-disable-next-line global-require
          source={require('@assets/like.json')}
        />
      </View>

      <QuestionContainer>
        <QuestionWrapper>
          <Header>
            <IconButton icon="close" onPress={() => {}} />
            <CurrentQuestion fontSize={label.fontSize}>
              Questão 01/20
            </CurrentQuestion>
            <IconButton icon="timer" onPress={() => {}} />
          </Header>

          <InformationsWrapper>
            <ScrollWrapper>
              <QuestionDescription>
                {/* eslint-disable-next-line global-require */}
                <QuestionImage source={require('@assets/icon.png')} />
                <QuestionText fontSize={label.fontSize}>
                  Qual a cor do líquido de Erlenmeyer?
                </QuestionText>
              </QuestionDescription>

              {fakeAnswers.map((answer) => (
                <AnswerContainer key={answer}>
                  <AnswerText fontSize={label.fontSize}>{answer}</AnswerText>
                </AnswerContainer>
              ))}
            </ScrollWrapper>
            <Footer>
              <StyledButton mode="text" onPress={() => {}}>
                Pular
              </StyledButton>
              <StyledButton onPress={() => {}}>Confirmar</StyledButton>
            </Footer>
          </InformationsWrapper>
        </QuestionWrapper>
      </QuestionContainer>
    </>
  );
};

export default Question;