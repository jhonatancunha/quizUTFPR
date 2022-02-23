import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '@api';
import { useSpring, animated } from '@react-spring/native';

// COMPONENTS
import Container from '@components/Container';
import theme from '@theme';
import CardQuizBasic from '../../components/CardQuizzes/Basic';

// THEME
import SeeMoreButton from '../../components/SeeMoreButton';

// STYLES
import { StyledScrollView, QuizContainer } from '../../style';

const HomeQuizzes = () => {
  const navigation = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);

  const [moveMe, toggleMoveMe] = useState(false);

  const move = useSpring({
    backgroundColor: moveMe ? 'orange' : 'red',
  });

  const getAllPublishedQuizzes = async () => {
    try {
      const { data } = await api.post('/publishedQuiz/getAll', {
        page: 1,
      });
      setAllQuizzes(data);
    } catch (error) {
      // console.error(error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAllPublishedQuizzes();
    setRefreshing(false);
  });

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  useEffect(() => {
    const unsubscribeListenTabPress = navigation.addListener('tabPress', () => {
      onRefresh();
    });

    return unsubscribeListenTabPress;
  }, [navigation]);

  return (
    <Container>
      <StyledScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <animated.View style={move}>
          <Text onPress={() => toggleMoveMe(!moveMe)}>teste</Text>
        </animated.View>
        {allQuizzes.length > 0 && (
          <>
            <SeeMoreButton
              onPress={() => {
                navigation.navigate('InfinityScrollQuizzesStack', {
                  screen: 'InfinityScrollHomeQuizzes',
                });
              }}
            />

            <QuizContainer>
              {/* <QuizTitle>Quizes</QuizTitle> */}
              {allQuizzes.map((quiz) => (
                <CardQuizBasic
                  key={quiz.id}
                  quiz={quiz}
                  color={theme.color.purple}
                  navigate={() =>
                    navigation.navigate('Descricao', {
                      quiz: {
                        id: quiz.id,
                        title: quiz.title,
                        description: quiz.description,
                        pin: quiz.pin,
                        image: quiz?.image?.url,
                        tags: quiz.tagsQuiz.map((tag) => tag.name),
                        isFavorite: quiz.isFavorite,
                        noTime: quiz.noTime,
                      },
                    })
                  }
                />
              ))}
            </QuizContainer>
          </>
        )}
      </StyledScrollView>
    </Container>
  );
};

export default HomeQuizzes;