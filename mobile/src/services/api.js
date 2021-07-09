import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const ip = '10.0.2.2';
const ip = '192.168.15.9';

const api = axios.create({
  baseURL: `http://${ip}:3333`,
});

api.interceptors.request.use(async (config) => {
  const data = await AsyncStorage.getItem('@student');
  if (data) {
    const parsedData = data != null ? JSON.parse(data) : null;
    config.headers.common.Authorization = parsedData.token
      ? `Bearer ${parsedData.token}`
      : '';
  }
  return config;
});

axios.interceptors.response.use(
  (response) =>
    // Do something with response data
    response,
  (error) => {
    // Do something with response error
    Promise.reject(error);
    if (error.response.status === 401) {
      AsyncStorage.clear('@student');
    }
  }
);

export default api;
