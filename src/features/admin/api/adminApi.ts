import { axiosClient } from '@/shared/lib/api';
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
 * @param request - 자격증명 요청
 * @param onProgress - 진행 상황 콜백
 * @param onError - 에러 콜백
 * @returns EventSource 인스턴스 (수동 종료용)
 */
export const loadConfluenceDataWithSSE = (
  request: SaveCredentialsRequest,
  onProgress: (event: ConfluenceProgressEvent) => void,
  onError: (error: string) => void,
): EventSource | null => {
  try {
    // ✅ Query 파라미터로 자격증명 전달
    const params = new URLSearchParams({
      space_key: request.space_key,
      atlassian_id: request.atlassian_id,
      api_token: request.api_token,
    });

    const eventSource = new EventSource(`/api/admin/confluence/load-stream?${params.toString()}`);

    // ✅ SSE 메시지 수신
    eventSource.addEventListener('message', (event) => {
      try {
        const data: ConfluenceProgressEvent = JSON.parse(event.data);
        onProgress(data);

        // 완료 또는 에러 시 자동 종료
        if (data.status === 'completed' || data.status === 'error') {
          eventSource.close();
        }
      } catch (e) {
        console.error('❌ SSE 메시지 파싱 실패:', e);
        onError('메시지 파싱 오류');
      }
    });

    // ✅ 연결 에러 처리
    eventSource.onerror = () => {
      eventSource.close();
      onError('서버 연결이 끊어졌습니다');
    };

    return eventSource;
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
