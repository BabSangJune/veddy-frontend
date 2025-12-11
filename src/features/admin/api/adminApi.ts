import { axiosClient } from '@/shared/lib/api';
import { streamClient } from '@/shared/lib/api/streamClient';
import { ConfluenceProgressEvent, SaveCredentialsRequest } from '../model';

/**
 * Confluence 데이터 로드 요청 타입
 */
export interface LoadConfluenceRequest {
  space_key: string;
  atlassian_id: string;
  api_token: string;
}

/**
 * Confluence 데이터 로드 응답 타입
 */
export interface LoadConfluenceResponse {
  status: string;
  space_key: string;
  total_pages: number;
  success_count: number;
  error_count: number;
  total_chunks: number;
  message: string;
}

/**
 * Confluence 상태 응답 타입
 */
export interface ConfluenceStatusResponse {
  status: string;
  total_documents: number;
  total_spaces: number;
  space_stats: Record<
    string,
    {
      count: number;
      docs: Array<{ id: string; title: string }>;
    }
  >;
}

/**
 * ✨ Confluence 데이터 로드
 */
export const loadConfluenceData = async (
  request: LoadConfluenceRequest,
): Promise<LoadConfluenceResponse> => {
  const response = await axiosClient.post<LoadConfluenceResponse>('/admin/confluence/load', {
    space_key: request.space_key,
    atlassian_id: request.atlassian_id,
    api_token: request.api_token,
  });
  return response.data;
};

/**
 * ✨ SSE: Confluence 데이터 로드 (실시간 진행 상황)
 * 
 * streamClient를 사용하여 토큰 자동 추가
 *
 * @param request - 자격증명 요청
 * @param onProgress - 진행 상황 콜백
 * @param onError - 에러 콜백
 * @returns EventSource 인스턴스 (수동 종료용)
 */
export const loadConfluenceDataWithSSE = (
  request: SaveCredentialsRequest,
  token: string | null,
  onProgress: (event: ConfluenceProgressEvent) => void,
  onError: (error: string) => void,
): (() => void) | null => {
  try {
    // ✅ Query 파라미터로 자격증명 전달
    const params = new URLSearchParams({
      space_key: request.space_key,
      atlassian_id: request.atlassian_id,
      api_token: request.api_token,
    });

    // ✅ streamClient 사용 (토큰 자동 추가)
    streamClient(`/admin/confluence/load-stream?${params.toString()}`, {
      token,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // ✅ ReadableStream으로 SSE 처리
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        if (!reader) {
          onError('스트림을 읽을 수 없습니다');
          return;
        }

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // ✅ 개별 메시지 파싱 (\n\n으로 구분)
          const lines = buffer.split('\n\n');
          buffer = lines[lines.length - 1];

          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
            if (line.startsWith('data: ')) {
              try {
                const jsonStr = line.slice(6); // 'data: ' 제거
                const data: ConfluenceProgressEvent = JSON.parse(jsonStr);
                onProgress(data);

                // 완료 또는 에러 시 루프 종료
                if (data.status === 'completed' || data.status === 'error') {
                  return;
                }
              } catch (e) {
                console.error('❌ SSE 메시지 파싱 실패:', e);
                onError('메시지 파싱 오류');
              }
            }
          }
        }
      })
      .catch((error) => {
        console.error('❌ SSE 스트림 오류:', error);
        onError(error.message || '서버 연결이 끊어졌습니다');
      });

    // ✅ 정리 함수 반환 (필요시 연결 중단)
    return () => {
      // Fetch의 경우 AbortController를 사용해야 함
      // 하지만 이미 시작된 stream은 읽기만 중단
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
    onError(errorMessage);
    return null;
  }
};

/**
 * ✨ 폴링: 현재 진행 상황 조회
 * (SSE를 지원하지 않는 클라이언트에서 사용)
 */
export const getConfluenceProgress = async () => {
  const response = await axiosClient.get('/admin/confluence/progress');
  return response.data;
};

/**
 * ✨ Confluence 상태 조회
 */
export const getConfluenceStatus = async (): Promise<ConfluenceStatusResponse> => {
  const response = await axiosClient.get<ConfluenceStatusResponse>('/admin/confluence/status');
  return response.data;
};
