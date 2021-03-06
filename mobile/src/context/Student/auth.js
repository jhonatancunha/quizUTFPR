import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api';

export const StudentAuthContext = createContext();

const StudentAuth = ({ children }) => {
  const initialValue = {
    student: null,
    token: null,
  };

  const [studentInfo, setStudentInfo] = useState(initialValue);
  const localStorageItem = '@student';

  const getOnLocalStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(localStorageItem);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.warn(error);
      return error;
    }
  };

  const saveOnLocalStorage = async (values) => {
    try {
      const jsonValue = JSON.stringify(values);
      await AsyncStorage.setItem(localStorageItem, jsonValue);
    } catch (error) {
      console.warn(error);
      return error;
    }
  };

  const register = async (values) => {
    try {
      const { name, email, password } = values;
      const response = await api.post('/student/register', {
        name,
        email,
        password,
      });

      const studentValues = {
        token: response.data.token,
        student: response.data.student,
      };

      setStudentInfo(studentValues);
      saveOnLocalStorage(studentValues);
      return response;
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.data.error,
      };
    }
  };

  const login = async (values) => {
    try {
      const { email, password } = values;
      const response = await api.post('/student/login', { email, password });

      const studentValues = {
        token: response.data.token,
        student: response.data.student,
      };

      setStudentInfo(studentValues);
      saveOnLocalStorage(studentValues);

      return response;
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.data.error,
      };
    }
  };

  const logout = async () => {
    try {
      setStudentInfo(initialValue);
      await AsyncStorage.removeItem(localStorageItem);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <StudentAuthContext.Provider
      value={{
        studentInfo,
        setStudentInfo,
        login,
        logout,
        register,
        getOnLocalStorage,
      }}
    >
      {children}
    </StudentAuthContext.Provider>
  );
};

StudentAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StudentAuth;
