// src/shared/lib/api/streamClient.ts
import { CONFIG } from '@/shared/config/environment';

/**
 * SSE 스트림용 Fetch 클라이언트
 * 토큰을 자동으로 Authorization 헤더에 추가
 */
export const streamClient = async (
  url: string,
  options: RequestInit & { token?: string | null },
) => {
  const headers = new Headers(options.headers || {});

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  // CONFIG.API_BASE_URL을 baseURL로 사용
  const fullUrl = url.startsWith('http') ? url : `${CONFIG.API_BASE_URL}${url}`;

  return fetch(fullUrl, {
    ...options,
    headers,
  });
};
