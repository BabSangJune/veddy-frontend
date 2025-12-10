// src/features/admin/api/index.ts

import { axiosClient } from '@/shared/lib/api';

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
 * ✨ Confluence 상태 조회
 */
export const getConfluenceStatus = async (): Promise<ConfluenceStatusResponse> => {
  const response = await axiosClient.get<ConfluenceStatusResponse>('/admin/confluence/status');
  return response.data;
};
