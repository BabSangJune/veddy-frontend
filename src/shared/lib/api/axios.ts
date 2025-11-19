// src/shared/lib/api/axios.ts
import axios from 'axios';

/**
 * Axios 인스턴스 설정
 */
export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 요청 인터셉터
 */
apiClient.interceptors.request.use(
  (config) => {
    // 필요 시 인증 토큰 추가
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * 응답 인터셉터
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
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
