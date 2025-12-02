// src/shared/lib/api/axiosClient.ts
import axios from 'axios';
import { useAuthStore } from '@/entities/auth';
import { CONFIG } from '@/shared/config/environment';

/**
 * 일반 API용 Axios 클라이언트
 * 자동으로 토큰을 추가하고 에러를 처리함
 */
export const axiosClient = axios.create({
  baseURL: CONFIG.API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 요청 인터셉터
 */
axiosClient.interceptors.request.use(
  (config) => {
    // JWT 토큰 추가
    const token = useAuthStore.getState().getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * 응답 인터셉터
 */
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 토큰 만료 시 로그아웃 처리
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    // 에러 처리
    if (error.response) {
      // 서버 응답이 있는 경우
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // 요청은 전송되었으나 응답이 없는 경우
      console.error('Network Error:', error.request);
    } else {
      // 요청 설정 중 에러
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);
