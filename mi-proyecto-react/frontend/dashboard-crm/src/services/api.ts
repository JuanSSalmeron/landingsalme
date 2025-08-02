import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://137.184.58.132:9999/api',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
