// src/features/chat/api/streamChat.ts

import { useAuthStore } from '@/entities/auth';
import type { SourceDocument } from '@/entities/message';

import { streamClient } from '@/shared/lib/api';

export interface ChatRequest {
  user_id?: string;
  query: string;
  table_mode?: boolean;
}

export const streamChat = async (
  request: ChatRequest,
  onToken: (token: string) => void,
  onComplete: (sources?: SourceDocument[]) => void,
  onError: (error: Error) => void,
): Promise<void> => {
  const token = useAuthStore.getState().getToken();

  const endpoint = '/chat/stream';

  console.log('[streamChat] 요청:', endpoint, {
    ...request,
    table_mode_enabled: request.table_mode ?? false,
  });

  try {
    // 🔥 타임아웃 컨트롤러 추가 (5분 = 300,000ms)
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      300000, // 🔥 30초 → 5분 (300,000ms)
    );

    const response = await streamClient(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      token: token ?? undefined,
      signal: controller.signal, // 🔥 타임아웃 신호 추가
    });

    clearTimeout(timeoutId); // 🔥 성공 시 타임아웃 해제

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
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        let eventEndIndex: number;

        while ((eventEndIndex = buffer.indexOf('\n\n')) !== -1) {
          const event = buffer.slice(0, eventEndIndex).trim();
          buffer = buffer.slice(eventEndIndex + 2);

          if (!event) continue;

          let jsonStr = event;
          if (event.startsWith('data: ')) {
            jsonStr = event.slice(6).trim();
          }

          try {
            const data = JSON.parse(jsonStr);

            if (data.type === 'token') {
              onToken(data.token);
            } else if (data.type === 'done') {
              console.log('[streamChat] 완료 신호 수신');
              onComplete();
              reader.releaseLock();
              return;
            } else if (data.type === 'error') {
              throw new Error(data.error);
            }
          } catch (parseError) {
            console.error('[streamChat] JSON 파싱 실패:', {
              원본이벤트: event,
              JSON문자열: jsonStr,
              에러: parseError,
            });
          }
        }
      }

      if (buffer.trim()) {
        console.warn('[streamChat] 처리되지 않은 버퍼:', buffer);
      }
    } finally {
      reader.releaseLock();
    }
  } catch (error) {
    console.error('[streamChat] 에러:', error);
    // 🔥 타임아웃 에러 처리
    if (error instanceof Error && error.name === 'AbortError') {
      onError(new Error('요청 시간이 초과되었습니다. (5분) 잠시 후 다시 시도해주세요.'));
    } else {
      onError(error instanceof Error ? error : new Error('Unknown error'));
    }
  }
};

export const healthCheck = async (): Promise<{
  status: string;
  message?: string;
}> => {
  const token = useAuthStore.getState().getToken();

  // ✅ 간단히 '/health' 경로만 전달
  const response = await streamClient('/health', {
    method: 'GET',
    token: token ?? undefined,
  });

  if (!response.ok) {
    throw new Error('Health check failed');
  }

  return response.json();
};

/**
 * 컨테이너 깨우기
 */
export const wakeUpContainer = async (): Promise<{
  status: string;
  message: string;
  estimated_time_seconds?: number;
}> => {
  const token = useAuthStore.getState().getToken();

  const response = await streamClient('/container/wake-up', {
    method: 'POST',
    token: token ?? undefined,
  });

  if (!response.ok) {
    throw new Error('Failed to wake up container');
  }

  return response.json();
};

/**
 * 컨테이너 상태 조회
 */
export const getContainerStatus = async (): Promise<{
  status: string;
  azure_status?: Record<string, any>;
  timestamp: string;
  provider: string;
}> => {
  const token = useAuthStore.getState().getToken();

  const response = await streamClient('/container/status', {
    method: 'GET',
    token: token ?? undefined,
  });

  if (!response.ok) {
    throw new Error('Failed to get container status');
  }

  return response.json();
};
