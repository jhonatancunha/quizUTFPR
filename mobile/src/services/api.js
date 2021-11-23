import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from './rootNavigation';

// const ip = '10.0.0.105:3333';
const ip = '10.0.2.2:3333'; // Android Studio ********NÃO APAGAR********
// const ip = '192.168.237.64:3333';

const api = axios.create({
  baseURL: `http://${ip}`,
});

// USADO PARA CANCELAR REQUEST QUANDO COMPONENTE DESMONTAR
api.CancelToken = axios.CancelToken;
api.isCancel = axios.isCancel;

api.interceptors.request.use(async (config) => {
  const data = await AsyncStorage.getItem('@TOKEN');
  if (data) {
    // const token = data != null ? JSON.parse(data) : null;
    config.headers.common.Authorization = data ? `Bearer ${data}` : '';
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config || error;
    const requestStatus = error?.response?.status || null;
    const refreshTokenExpired =
      error?.response?.data?.refresh_token_expired || false;

    if (requestStatus === 401 && !refreshTokenExpired) {
      const refreshToken = await AsyncStorage.getItem('@REFRESH_TOKEN');
      const response = await api.post('/refresh-token', {
        refresh_token: JSON.parse(refreshToken),
      });
      const { token } = response.data;
      await AsyncStorage.setItem('@TOKEN', token);

      originalRequest.headers.Authorization = token ? `Bearer ${token}` : '';
      return api.request(originalRequest);
    }

    if (requestStatus === 401 && refreshTokenExpired) {
      navigate('Logout');
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
