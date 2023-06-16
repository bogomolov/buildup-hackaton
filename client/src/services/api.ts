import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';


const baseURL = 'https://dev.sodi.center/';

const axiosInstance = axios.create({
  baseURL,
});

export { axiosInstance };
