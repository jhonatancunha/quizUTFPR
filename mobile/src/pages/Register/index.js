import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// COMPONENTS
import Container from '@components/Container';
import Input from '@components/Input';
import ButtonGradient from '@components/ButtonGradient';
import Header from '@components/Header';
import DismissKeyboard from '@components/DismissKeyboard';

// STYLES
import { FontAwesome5, Zocial, Ionicons } from '@expo/vector-icons';

// HOOKS
import useStudentAuth from '@hook/useStudentAuth';

import {
  BackgroundImage,
  InputWrapper,
  WrapperButton,
  StyledTextButton,
} from './styles';

// ICONS

const Register = ({ navigation }) => {
  const registerValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, ({ min }) => `O mínimo são ${min} caracteres`)
      .required('Informe um apelido'),
    email: Yup.string()
      .email('Informe um e-mail válido')
      .required('Informe um e-mail'),
    password: Yup.string()
      .min(8, ({ min }) => `O mínimo são ${min} caracteres`)
      .required('A senha é obrigatória'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Deve ser igual a senha')
      .required('Obrigatório'),
  });

  const { register } = useStudentAuth();

  return (
    <Container>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={registerValidationSchema}
        onSubmit={(values) => register(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            >
              <DismissKeyboard>
                <>
                  <BackgroundImage />
                  <Header
                    iconButton={
                      <Ionicons name="chevron-back" size={32} color="white" />
                    }
                    onPressButton={() => navigation.goBack()}
                    titleContent="Cadastro"
                    textContent="Por favor, informe seus dados"
                  />

                  <InputWrapper>
                    <Input
                      error={errors.name && touched.name}
                      errorMessage={errors.name}
                      fill="black"
                      placeholder="Digite seu apelido"
                      icon={
                        <FontAwesome5 name="user-alt" size={24} color="black" />
                      }
                      label="Apelido"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />

                    <Input
                      fill="black"
                      error={errors.email && touched.email}
                      errorMessage={errors.email}
                      autoCompleteType="email"
                      placeholder="Digite seu endereço eletrônico"
                      keyboardType="email-address"
                      icon={<Zocial name="email" size={24} color="black" />}
                      label="E-mail"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />

                    <Input
                      error={errors.password && touched.password}
                      errorMessage={errors.password}
                      fill="black"
                      placeholder="Digite uma senha"
                      icon={
                        <FontAwesome5 name="lock" size={24} color="black" />
                      }
                      label="Senha"
                      secureTextEntry
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />

                    <Input
                      error={errors.confirmPassword && touched.confirmPassword}
                      errorMessage={errors.confirmPassword}
                      fill="black"
                      placeholder="Confirme a senha digitada"
                      icon={
                        <FontAwesome5 name="lock" size={24} color="black" />
                      }
                      label="Confirmar Senha"
                      secureTextEntry
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                    />
                  </InputWrapper>
                </>
              </DismissKeyboard>
            </KeyboardAvoidingView>
            <WrapperButton>
              <ButtonGradient
                // colors={['#fdb646', '#f99f4c']}
                title="Submit"
                variant="primary"
                onPress={handleSubmit}
              >
                CADASTRAR
              </ButtonGradient>
            </WrapperButton>

            <StyledTextButton
              variant="secondary"
              onPress={() => navigation.navigate('Login')}
            >
              Já possui cadastro? Realize o Login
            </StyledTextButton>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
