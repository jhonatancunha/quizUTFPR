import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useStudentAuth from '@hook/useStudentAuth';
import { navigationRef } from '../services/rootNavigation';

// THEME
import { navigationTheme } from '../styles/theme';

// ROUTES
import RoutesTokenNotRequired from './category/tokenNotRequired';
import RoutesTokenIsRequired from './category/tokenIsRequired';

const routes = () => {
  const {
    isLoggedIn,
    studentInfo,
    setStudentInfo,
    getOnLocalStorage,
    studentStorageItem,
  } = useStudentAuth();

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await getOnLocalStorage(studentStorageItem);
      if (studentData) setStudentInfo(studentData);
    };

    fetchData();
  }, [isLoggedIn]);

  return (
    <NavigationContainer theme={navigationTheme} ref={navigationRef}>
      {!isLoggedIn &&
      studentInfo.token === null &&
      studentInfo.student === null ? (
        <RoutesTokenNotRequired />
      ) : (
        <RoutesTokenIsRequired />
      )}
    </NavigationContainer>
  );
};

export default routes;
