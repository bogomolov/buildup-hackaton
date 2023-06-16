import axios from 'axios';

const baseURL = 'https://dev.sodi.center/';

const axiosInstance = axios.create({
  baseURL,
});

export { axiosInstance };
