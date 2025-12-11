// src/features/admin/model/confluenceStore.ts

import { create } from 'zustand';

import { useAuthStore } from '@/entities/auth';

import {
  LoadConfluenceResponse,
  ConfluenceStatusResponse,
  loadConfluenceData,
  loadConfluenceDataWithSSE,
  getConfluenceStatus,
  type LoadConfluenceRequest,
} from '../api';

import type { ConfluenceProgressEvent } from './types';

interface ConfluenceState {
  spaceKey: string;
  atlassianId: string;
  apiToken: string;
  isLoading: boolean;
  isStatusLoading: boolean;
  loadResult: LoadConfluenceResponse | null;
  statusResult: ConfluenceStatusResponse | null;
  progressEvents: ConfluenceProgressEvent[];
  currentProgress: number;
  error: string | null;

  setSpaceKey: (value: string) => void;
  setAtlassianId: (value: string) => void;
  setApiToken: (value: string) => void;
  loadConfluenceData: () => Promise<void>;
  getConfluenceStatus: () => Promise<void>;
  clearForm: () => void;
  clearError: () => void;
}

export const useConfluenceStore = create<ConfluenceState>((set, get) => ({
  spaceKey: '',
  atlassianId: '',
  apiToken: '',
  isLoading: false,
  isStatusLoading: false,
  loadResult: null,
  statusResult: null,
  progressEvents: [],
  currentProgress: 0,
  error: null,

  setSpaceKey: (value) => set({ spaceKey: value }),
  setAtlassianId: (value) => set({ atlassianId: value }),
  setApiToken: (value) => set({ apiToken: value }),

  loadConfluenceData: async () => {
    const state = get();

    // ✅ 이미 로딩 중이면 그냥 리턴 (중복 방지)
    if (state.isLoading) {
      console.warn('⚠️ 이미 로드 중입니다. 중복 요청 방지');
      return;
    }

    const { spaceKey, atlassianId, apiToken } = state;
    const authToken = useAuthStore.getState().token;

    if (!spaceKey.trim()) {
      set({ error: 'Space Key를 입력하세요' });
      return;
    }
    if (!atlassianId.trim()) {
      set({ error: 'Atlassian ID를 입력하세요' });
      return;
    }
    if (!apiToken.trim()) {
      set({ error: 'API Token을 입력하세요' });
      return;
    }
    set({ isLoading: true, error: null, progressEvents: [], currentProgress: 0 });

    try {
      const request: LoadConfluenceRequest = {
        space_key: spaceKey,
        atlassian_id: atlassianId,
        api_token: apiToken,
      };

      // 1) POST /load
      const response = await loadConfluenceData(request);
      console.log('✅ POST /load 완료:', response);

      // 2) SSE /load-stream — 여기서만 호출!
      loadConfluenceDataWithSSE(
        request,
        authToken,
        (event: ConfluenceProgressEvent) => {
          console.log('📊 진행 상황 이벤트:', event);

          set((s) => ({
            progressEvents: [...s.progressEvents, event],
            currentProgress: event.progress_percent ?? s.currentProgress,
          }));

          if (event.status === 'completed') {
            set({
              loadResult: {
                status: 'completed',
                space_key: spaceKey,
                total_pages: event.total_pages ?? 0,
                success_count: event.success_count ?? 0,
                error_count: event.error_count ?? 0,
                total_chunks: event.total_chunks ?? 0,
                message: event.message ?? '로드 완료',
              },
              isLoading: false,
              currentProgress: 100,
            });
          } else if (event.status === 'error') {
            set({
              error: event.message ?? '로드 중 오류 발생',
              isLoading: false,
            });
          }
        },
        (error: string) => {
          console.error('❌ SSE 에러 콜백:', error);
          set({
            error,
            isLoading: false,
          });
        },
      );
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || '로드 실패';
      set({
        error: errorMessage,
        isLoading: false,
      });
      console.error('❌ loadConfluenceData 예외:', err);
    }
  },

  getConfluenceStatus: async () => {
    set({ isStatusLoading: true, error: null });

    try {
      const response = await getConfluenceStatus();
      set({
        statusResult: response,
        isStatusLoading: false,
      });
      console.log('✅ Confluence 상태 조회 완료:', response);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || '상태 조회 실패';
      set({
        error: errorMessage,
        isStatusLoading: false,
      });
      console.error('❌ 상태 조회 실패:', err);
    }
  },

  clearForm: () => {
    set({
      spaceKey: '',
      atlassianId: '',
      apiToken: '',
      error: null,
      loadResult: null,
      statusResult: null,
      progressEvents: [],
      currentProgress: 0,
    });
  },

  clearError: () => set({ error: null }),
}));
