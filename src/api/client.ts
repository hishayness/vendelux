import axios from 'axios';

const API_KEY = 'yljS9B03IqJ0bUUaQUJDlggJdgc6d10x';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apikey: API_KEY,
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
