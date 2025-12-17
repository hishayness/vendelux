import axios from 'axios';

const TICKETMASTER_BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY || 'yljS9B03IqJ0bUUaQUJDlggJdgc6d10x';

export const apiClient = axios.create({
  baseURL: TICKETMASTER_BASE_URL,
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
