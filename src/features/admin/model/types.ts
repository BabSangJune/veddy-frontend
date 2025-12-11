/**
 * Confluence 데이터 로드 요청
 */
export interface SaveCredentialsRequest {
  space_key: string;
  atlassian_id: string;
  api_token: string;
}

/**
 * Confluence 진행률 스트리밍 이벤트
 */
export interface ConfluenceProgressEvent {
  status: 'pages_loaded' | 'processing' | 'completed' | 'error';
  total_pages?: number;
  processed_pages?: number;
  current_page?: string;
  progress_percent?: number;
  elapsed_time?: number;
  eta_seconds?: number;
  success_count?: number;
  skip_count?: number;
  error_count?: number;
  total_chunks?: number;
  message?: string;
}
