// src/shared/lib/api/axiosClient.ts
import axios from 'axios';

import { CONFIG } from '@/shared/config/environment';

export const axiosClient = axios.create({
  baseURL: CONFIG.API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 설정 함수를 export (외부에서 주입)
export const setupAuthInterceptor = (getToken: () => string | null) => {
  axiosClient.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
};

export const setupResponseInterceptor = (onUnauthorized: () => void) => {
  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        onUnauthorized();
      }

      if (error.response) {
        console.error('API Error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('Network Error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      return Promise.reject(error);
    },
  );
};
