/* eslint-disable global-require */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
// import api from '@api';

// COMPONENTS
import Container from '@components/Container';

// ICONS
import { AntDesign } from '@expo/vector-icons';

// STYLES
import {
  QuizTitle,
  HeaderButton,
  BackgroundHeader,
  QuizCard,
  Description,
  StyledImage,
  HeaderTitle,
  StyledIconButton,
  StyledView,
  StyledScrollView,
  QuizContainer,
} from './styles';

const Home = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <StyledScrollView>
        <BackgroundHeader>
          <HeaderButton onPress={() => navigation.openDrawer()}>
            <AntDesign name="menu-fold" size={32} color="white" />
          </HeaderButton>
          <HeaderTitle>Quizzes Respondidos</HeaderTitle>
        </BackgroundHeader>
        <QuizContainer>
          <QuizCard onPress={() => navigation.navigate('AttempsOfQuiz')}>
            <StyledImage source={require('@assets/teste.jpg')} />
            <StyledView>
              <Description>
                <QuizTitle fill="black">Título</QuizTitle>
                {/* <StyledText>Criador: {quiz.teacher}</StyledText> */}
              </Description>
            </StyledView>

            <StyledIconButton>
              <AntDesign name="arrowright" size={24} color="#4B24B1" />
            </StyledIconButton>
          </QuizCard>
        </QuizContainer>
      </StyledScrollView>
    </Container>
  );
};
export default Home;