/* eslint-disable global-require */
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// ICONS
import { Ionicons } from '@expo/vector-icons';

// COMPONENTS
import Attempts from './Components/Attempts';
import Tags from './Components/Tags';

import {
  QuizAttemptsHeader,
  StyledImageBackground,
  GoBackButtonWrapper,
  StyledIconButton,
  BottomDecoration,
  Description,
  StyledText,
  Divider,
  ButtonsContainer,
  ButtonWrapper,
  StyledButtonNavigation,
  PlayButtonWrapper,
  ButtonStyled,
  IconButtonWrapper,
  StyledButtonText,
  StyledScrollView,
} from './styles';

const Home = ({ route }) => {
  const navigation = useNavigation();
  const {
    id,
    title,
    description,
    pin,
    attempts,
    teacher,
    image,
    amountOfQuestions,
    tags,
    isFavorite,
    noTime,
  } = route.params;

  const tagsNames = tags.map((tag) => tag.name);

  const [isAttemptsSelected, setAttemptsSelect] = useState(true);
  const [isTagsSelected, setTagsSelect] = useState(false);

  const handleClickAttemptsSelected = () => {
    setAttemptsSelect(true);
    setTagsSelect(false);
  };

  const handleClickTagsSelected = () => {
    setTagsSelect(true);
    setAttemptsSelect(false);
  };

  return (
    <StyledScrollView>
      <QuizAttemptsHeader>
        <StyledImageBackground
          source={
            image
              ? {
                  uri: image,
                }
              : null
          }
        >
          <GoBackButtonWrapper>
            <StyledIconButton onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={32} color="white" />
            </StyledIconButton>
          </GoBackButtonWrapper>
          <PlayButtonWrapper resume={false}>
            <ButtonStyled
              onPress={() =>
                navigation.navigate('Descricao', {
                  quiz: {
                    id,
                    title,
                    description,
                    pin,
                    image,
                    tags: tagsNames,
                    isFavorite,
                    noTime,
                  },
                })
              }
            >
              <IconButtonWrapper>
                <StyledIconButton>
                  <Ionicons name="ios-play-circle" size={32} color="white" />
                </StyledIconButton>
                <StyledButtonText fill="white">JOGAR</StyledButtonText>
              </IconButtonWrapper>
            </ButtonStyled>
          </PlayButtonWrapper>
          <BottomDecoration />
        </StyledImageBackground>
        <Description>
          <StyledText title>{title}</StyledText>
          <StyledText>By: {teacher.name}</StyledText>
          <StyledText>Qtde. de questões: {amountOfQuestions}</StyledText>
        </Description>
      </QuizAttemptsHeader>

      <Divider />

      <ButtonsContainer>
        <ButtonWrapper selected={isAttemptsSelected}>
          <StyledButtonNavigation
            selected={isAttemptsSelected}
            onPress={() => handleClickAttemptsSelected()}
          >
            Tentativas
          </StyledButtonNavigation>
        </ButtonWrapper>
        <ButtonWrapper selected={isTagsSelected}>
          <StyledButtonNavigation
            selected={isTagsSelected}
            onPress={() => handleClickTagsSelected()}
          >
            Tags
          </StyledButtonNavigation>
        </ButtonWrapper>
      </ButtonsContainer>

      {isAttemptsSelected && (
        <Attempts attempts={attempts} amountOfQuestions={amountOfQuestions} />
      )}

      {isTagsSelected && <Tags tags={tagsNames} />}
    </StyledScrollView>
  );
};

export default Home;
