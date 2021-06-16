import React from 'react';
import { useNavigation } from '@react-navigation/native';

// COMPONENTS
import Container from '@components/Container';
import { Text, ImageBackground } from 'react-native';

// ICONS
import { AntDesign, FontAwesome } from '@expo/vector-icons';

// STYLES
import {
  HeaderWrapper,
  HeaderInformations,
  HeaderWelcomeTextView,
  StyledTitle,
  StyledParagraph,
  HeaderButton,
  SearchInput,
  InputWrapper,
  BackgroundHeader,
} from './styles';

const Home = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <HeaderWrapper>
        <BackgroundHeader>
          <HeaderInformations>
            <HeaderButton onPress={() => navigation.openDrawer()}>
              <AntDesign name="menu-fold" size={32} color="white" />
            </HeaderButton>
            <HeaderWelcomeTextView>
              <StyledTitle fill="white">Seja bem-vindo,</StyledTitle>
              <StyledParagraph fill="white">
                Escolha um quiz e divirta-se!
              </StyledParagraph>
            </HeaderWelcomeTextView>
          </HeaderInformations>

          <InputWrapper>
            <FontAwesome name="search" size={25} color="#4B24B1" />
            <SearchInput placeholder="Digite o PIN" />
          </InputWrapper>
        </BackgroundHeader>
      </HeaderWrapper>
      <Text>Conteudis aqui!</Text>
    </Container>
  );
};

export default Home;
