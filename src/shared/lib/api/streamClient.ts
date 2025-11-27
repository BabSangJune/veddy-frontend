/**
 * SSE 스트림용 Fetch 클라이언트
 * 토큰을 자동으로 Authorization 헤더에 추가
 */
export const streamClient = async (
  url: string,
  options: RequestInit & { token?: string | null }
) => {
  const headers = new Headers(options.headers || {});

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
};
