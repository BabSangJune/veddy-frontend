// src/features/chat/api/chatApi.ts
import type { SourceDocument } from '@/entities/message';

// 🆕 table_mode 필드 추가
export interface ChatRequest {
    user_id: string;
    query: string;
    table_mode?: boolean; // 🆕 표 형식 답변 모드 (선택적)
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

    // 🆕 표 모드 로깅
    console.log('[streamChat] 요청:', endpoint, {
        ...request,
        table_mode_enabled: request.table_mode ?? false,
    });

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request), // 🆕 table_mode 자동 포함
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

                // ✅ 이벤트 분리 (\n\n 또는 \n)
                let eventEndIndex: number;

                while ((eventEndIndex = buffer.indexOf('\n\n')) !== -1) {
                    const event = buffer.slice(0, eventEndIndex).trim();
                    buffer = buffer.slice(eventEndIndex + 2);

                    if (!event) continue;

                    // ✅ 백엔드가 " " 없이 보내는 경우 처리
                    let jsonStr = event;

                    // " " 접두사가 있으면 제거
                    if (event.startsWith(' ')) {
                        jsonStr = event.slice(6).trim();
                    }
                    // 공백으로 시작하면 제거
                    else if (event.startsWith(' ')) {
                        jsonStr = event.slice(1).trim();
                    }

                    try {
                        const data = JSON.parse(jsonStr);

                        // 🆕 표 모드일 때 특별 로깅 (디버깅용)
                        if (request.table_mode && data.type === 'token' && data.token === '|') {
                            console.log('[streamChat] 📊 표 구분자 감지');
                        }

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
                            에러: parseError
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

export const healthCheck = async (): Promise<{ status: string; message?: string }> => {
    const endpoint = `${API_BASE_URL}/health`;
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error('Health check failed');
    }

    return response.json();
};
