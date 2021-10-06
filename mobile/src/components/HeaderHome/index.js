import React, { useState } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '@api';
import theme from '../../styles/theme';

// ICONS

import {
  HeaderWrapper,
  BackgroundHeader,
  HeaderInformations,
  HeaderButton,
  HeaderWelcomeTextView,
  StyledWelcome,
  StyledParagraph,
  InputWrapper,
  SearchInput,
} from './style';

const Header = () => {
  const navigation = useNavigation();

  const [pin, setPin] = useState();

  const getQuizByPIN = async () => {
    try {
      const { data } = await api.post('/quiz/getByPIN', { pin });

      navigation.navigate('Descricao', {
        idStudentQuiz: data.id_student_quiz,
        questionAmount: data.questionAmount,
        studentChoicesAmount: data.studentChoicesAmount,
        quiz: {
          id: data.quiz.id,
          title: data.quiz.title,
          description: data.quiz.description,
          pin: data.quiz.pin,
          image: data.quiz.image_base64,
          tags: data.quiz.tags_quiz.map((tag) => tag.name),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HeaderWrapper>
      <BackgroundHeader>
        <HeaderInformations>
          <HeaderButton onPress={() => navigation.openDrawer()}>
            <AntDesign name="menu-fold" size={32} color="white" />
          </HeaderButton>
          <HeaderWelcomeTextView>
            <StyledWelcome fill="white">Seja bem-vindo,</StyledWelcome>
            <StyledParagraph fill="white">
              Escolha um quiz e divirta-se!
            </StyledParagraph>
          </HeaderWelcomeTextView>
        </HeaderInformations>

        <InputWrapper>
          <FontAwesome name="search" size={25} color={theme.color.purple} />
          <SearchInput
            defaultValue={pin}
            onSubmitEditing={getQuizByPIN}
            onChangeText={(pinText) => setPin(pinText)}
            placeholder="Digite o PIN"
          />
        </InputWrapper>
      </BackgroundHeader>
    </HeaderWrapper>
  );
};

export default Header;
