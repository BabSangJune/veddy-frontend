// src/features/chat/api/streamChat.ts
import { streamClient } from '@/shared/lib/api';
import { useAuthStore } from '@/entities/auth';
import type { SourceDocument } from '@/entities/message';

export interface ChatRequest {
  query: string;
  table_mode?: boolean;
}

// ✅ API_BASE_URL 제거 (streamClient가 이미 처리)
export const streamChat = async (
  request: ChatRequest,
  onToken: (token: string) => void,
  onComplete: (sources?: SourceDocument[]) => void,
  onError: (error: Error) => void,
): Promise<void> => {
  const token = useAuthStore.getState().getToken();

  // ✅ 간단히 '/chat/stream' 경로만 전달 (streamClient가 baseURL 붙임)
  const endpoint = '/chat/stream';

  console.log('[streamChat] 요청:', endpoint, {
    ...request,
    table_mode_enabled: request.table_mode ?? false,
  });

  try {
    const response = await streamClient(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      token: token ?? undefined,
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
    onError(error instanceof Error ? error : new Error('Unknown error'));
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
