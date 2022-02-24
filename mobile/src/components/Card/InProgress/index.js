import React from 'react';

// Icons
import { AntDesign } from '@expo/vector-icons';

// Style
import {
  QuizCard,
  StyledImage,
  StyledView,
  Description,
  QuizTitle,
  StyledIconButton,
} from '../style';

import {
  QuizProgressBarBackground,
  QuizProgressBar,
  QuizProgressText,
} from './style';

const CardInProgress = ({ navigate, data, color }) => (
  <QuizCard onPress={navigate}>
    <StyledImage
      source={
        data?.quiz?.image?.url
          ? {
              uri: data.quiz.image.url,
            }
          : null
      }
    />
    <StyledView>
      <Description>
        <QuizTitle fill="black">{data.quiz.title}</QuizTitle>
      </Description>
      <QuizProgressBarBackground fill="lightGrey">
        <QuizProgressBar
          porcentage={(data.studentChoicesAmount * 100) / data.questionAmount}
          fill="purple"
        />
      </QuizProgressBarBackground>
    </StyledView>
    <QuizProgressText fill="purple">
      {Math.floor((data.studentChoicesAmount * 100) / data.questionAmount)}%
    </QuizProgressText>
    <StyledIconButton>
      <AntDesign name="arrowright" size={24} color={color} />
    </StyledIconButton>
  </QuizCard>
);

export default CardInProgress;