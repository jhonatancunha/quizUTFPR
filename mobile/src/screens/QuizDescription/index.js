/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Clipboard from 'expo-clipboard';

// API
import api from '@api';

// COMPONENTS
import Dialog from '@components/Dialog';
import Toast from '@components/Toast';

// LOTTIE
import SadAnimation from '@assets/lottie/sad_emote.json';

// HOOKS
import useQuestions from '@hook/useQuestion';

// STYLES
import {
  DetailsContainer,
  QuizDescriptionHeader,
  StyledImageBackground,
  GoBackButtonWrapper,
  StyledIconButton,
  StyledText,
  PlayButtonWrapper,
  StyledScrollView,
  BodyDescription,
  StyledTitle,
  StyledDescriptionText,
  TagsContainer,
  StyledTag,
  ButtonStyled,
  ResumeButtonWrapper,
  GiveUPButtonWraper,
  ButtonWrapper,
  StyledPIN,
  QuizProgress,
  StyledTitleProgress,
  StyledTextProgress,
  PinWrapper,
  Favorite,
} from './styles';

const QuizDescription = ({ route }) => {
  // eslint-disable-next-line no-unused-vars
  const { idStudentQuiz, questionAmount, studentChoicesAmount, quiz } =
    route.params;
  const { title, description, tags, id, pin, image, isFavorite, noTime } = quiz;

  const [visibleGiveUPModal, setVisibleGivUPModal] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  const [studentQuizID, setStudentQuizID] = useState(idStudentQuiz);
  const { getQuestionsOfQuizFromDatabase, setNoTime } = useQuestions();

  const navigation = useNavigation();

  const startQuizAndGetAllQuestions = async () => {
    const { data } = await api.post('/studentQuiz/startQuiz', { quiz_id: id });
    await getQuestionsOfQuizFromDatabase(id, data.id);
    navigation.navigate('CountDown');
  };

  const continueQuizAndGetAllQuestions = async () => {
    await getQuestionsOfQuizFromDatabase(id, studentQuizID);
    navigation.navigate('CountDown');
  };

  const giveUPQuiz = async () => {
    await api.put('/studentQuiz/finishQuiz', {
      quiz_id: id,
      id_student_quiz: studentQuizID,
    });

    setStudentQuizID(null);
  };

  const [showToast, setShowToast] = useState({
    open: false,
    message: '',
  });

  const handleCloseToast = () => {
    setShowToast({
      open: false,
      message: '',
    });
  };

  const copyToClipboardAndShowToast = () => {
    Clipboard.setString(pin);

    setShowToast({
      open: true,
      message: 'PIN copiado!',
    });
  };

  const handleFavorite = async () => {
    try {
      if (favorite) {
        await api.delete('/quiz/deleteFavorite', {
          params: { quiz_id: id },
        });
        setFavorite(false);
      } else {
        await api.post('/quiz/favorite', { quiz_id: id });
        setFavorite(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setNoTime(noTime);
  }, []);

  return (
    <>
      <DetailsContainer fill="white">
        <QuizDescriptionHeader>
          <StyledImageBackground
            source={
              image.length
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
            {studentQuizID ? (
              <ButtonWrapper resume>
                <ButtonStyled onPress={() => setVisibleGivUPModal(true)}>
                  <GiveUPButtonWraper>
                    <StyledText fill="white">DESISTIR</StyledText>
                  </GiveUPButtonWraper>
                </ButtonStyled>
                <ButtonStyled onPress={continueQuizAndGetAllQuestions}>
                  <ResumeButtonWrapper>
                    <StyledIconButton>
                      <Ionicons
                        name="ios-play-circle"
                        size={32}
                        color="white"
                      />
                    </StyledIconButton>
                    <StyledText fill="white">CONTINUAR</StyledText>
                  </ResumeButtonWrapper>
                </ButtonStyled>
              </ButtonWrapper>
            ) : (
              <ButtonWrapper resume={false}>
                <ButtonStyled onPress={startQuizAndGetAllQuestions}>
                  <PlayButtonWrapper>
                    <StyledIconButton>
                      <Ionicons
                        name="ios-play-circle"
                        size={32}
                        color="white"
                      />
                    </StyledIconButton>
                    <StyledText fill="white">JOGAR</StyledText>
                  </PlayButtonWrapper>
                </ButtonStyled>
              </ButtonWrapper>
            )}
          </StyledImageBackground>
        </QuizDescriptionHeader>

        <StyledScrollView>
          <BodyDescription>
            <Favorite onPress={handleFavorite}>
              {favorite ? (
                <MaterialIcons name="favorite" size={35} color="red" />
              ) : (
                <MaterialIcons name="favorite-border" size={35} color="black" />
              )}
            </Favorite>

            <StyledTitle>PIN</StyledTitle>
            <PinWrapper onPress={copyToClipboardAndShowToast}>
              <StyledPIN>{pin}</StyledPIN>
              <Feather name="copy" size={25} color="black" />
            </PinWrapper>

            <StyledTitle>{title}</StyledTitle>

            <StyledDescriptionText>{description}</StyledDescriptionText>

            <StyledTitle>TAGS</StyledTitle>

            <TagsContainer>
              {tags.map((tag) => (
                <StyledTag key={tag}>{tag}</StyledTag>
              ))}
            </TagsContainer>
          </BodyDescription>
        </StyledScrollView>
        {studentQuizID && (
          <QuizProgress fill="purple">
            <StyledTitleProgress>Questões repondidas: </StyledTitleProgress>
            <StyledTextProgress>
              {studentChoicesAmount}/{questionAmount}
            </StyledTextProgress>
          </QuizProgress>
        )}
      </DetailsContainer>

      <Dialog
        title="Deseja realmente desistir?"
        visible={visibleGiveUPModal}
        hideDialog={() => setVisibleGivUPModal(false)}
        firstButtonOnPress={() => setVisibleGivUPModal(false)}
        secondButtonOnPress={() => {
          giveUPQuiz();
          setVisibleGivUPModal(false);
        }}
        firstButtonLabel="NÂO"
        secondButtonLabel="SIM"
        lottieAnimation={
          <LottieView
            autoPlay
            loop
            style={{ width: 100 }}
            resizeMode="cover"
            speed={1}
            source={SadAnimation}
          />
        }
      >
        Seu score será calculado parcialmente de acordo com as questões já
        respondidas!
      </Dialog>

      <Toast handleClose={handleCloseToast} open={showToast.open}>
        {showToast.message}
      </Toast>
    </>
  );
};

export default QuizDescription;