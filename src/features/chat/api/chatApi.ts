// src/features/chat/api/chatApi.ts
import type { SourceDocument } from '@/entities/message';

export interface ChatRequest {
  user_id: string;
  query: string;
}

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (import.meta.env.DEV) {
    console.log('[API] Base URL:', envUrl || '/api (proxy)');
  }
  return envUrl || '/api';
};

const API_BASE_URL = getApiBaseUrl();

export const streamChat = async (
    request: ChatRequest,
    onToken: (token: string) => void,
    onComplete: (sources?: SourceDocument[]) => void,
    onError: (error: Error) => void,
): Promise<void> => {
  const endpoint = `${API_BASE_URL}/chat/stream`;
  console.log('[streamChat] 요청:', endpoint, request);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    console.log('[streamChat] 응답 상태:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log('[streamChat] 스트림 종료');

          // 남은 버퍼 처리
          if (buffer.trim()) {
            const content = buffer.trim();
            if (content === '[DONE]') {
              console.log('[streamChat] 완료');
              onComplete();
            } else if (content) {
              onToken(content);
            }
          }
          break;
        }

        // 버퍼에 추가
        buffer += decoder.decode(value, { stream: true });

        // \n\n로 분리 (SSE 형식)
        const parts = buffer.split('\n\n');

        // 마지막 불완전한 부분은 다음 반복을 위해 보관
        buffer = parts[parts.length - 1];

        // 완전한 청크들만 처리
        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i].trim();

          if (!part) continue;

          // ✅ "data: " 접두사 제거 (있으면)
          let content = part;
          if (content.startsWith('data:')) {
            content = content.substring(5).trim();
          } else if (content.startsWith('data: ')) {
            content = content.substring(6).trim();
          }

          // ✅ 앞뒤 공백 제거
          content = content.trim();

          if (!content) continue;

          console.log('[streamChat] 토큰:', JSON.stringify(content));

          // [DONE] 체크
          if (content === '[DONE]') {
            console.log('[streamChat] 완료 신호 수신');
            onComplete();
            reader.releaseLock();
            return;
          }

          // ERROR 체크
          if (content.startsWith('ERROR:')) {
            throw new Error(content.substring(6).trim());
          }

          // ✅ 토큰 전송
          onToken(content);
        }
      }
    } finally {
      reader.releaseLock();
    }
  } catch (error) {
    console.error('[streamChat] 에러:', error);
    onError(error instanceof Error ? error : new Error('Unknown error'));
  }
};

export const healthCheck = async (): Promise<{ status: string; message?: string }> => {
  const endpoint = `${API_BASE_URL}/health`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Health check failed');
  }

  return response.json();
};
