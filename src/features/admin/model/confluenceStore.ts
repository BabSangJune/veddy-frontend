// src/features/admin/model/confluenceStore.ts

import { create } from 'zustand';

import {
  LoadConfluenceResponse,
  ConfluenceStatusResponse,
  loadConfluenceData,
  getConfluenceStatus,
  type LoadConfluenceRequest,
} from '../api';

/**
 * Confluence Store 상태
 */
interface ConfluenceState {
  // 입력값
  spaceKey: string;
  atlassianId: string;
  apiToken: string;

  // 로딩 상태
  isLoading: boolean;
  isStatusLoading: boolean;

  // 결과
  loadResult: LoadConfluenceResponse | null;
  statusResult: ConfluenceStatusResponse | null;

  // 에러
  error: string | null;

  // 액션
  setSpaceKey: (value: string) => void;
  setAtlassianId: (value: string) => void;
  setApiToken: (value: string) => void;
  loadConfluenceData: () => Promise<void>;
  getConfluenceStatus: () => Promise<void>;
  clearForm: () => void;
  clearError: () => void;
}

export const useConfluenceStore = create<ConfluenceState>((set, get) => ({
  // 초기 상태
  spaceKey: '',
  atlassianId: '',
  apiToken: '',
  isLoading: false,
  isStatusLoading: false,
  loadResult: null,
  statusResult: null,
  error: null,

  // 입력값 업데이트
  setSpaceKey: (value) => set({ spaceKey: value }),
  setAtlassianId: (value) => set({ atlassianId: value }),
  setApiToken: (value) => set({ apiToken: value }),

  // Confluence 데이터 로드
  loadConfluenceData: async () => {
    const { spaceKey, atlassianId, apiToken } = get();

    // 입력값 검증
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

    set({ isLoading: true, error: null });

    try {
      const request: LoadConfluenceRequest = {
        space_key: spaceKey,
        atlassian_id: atlassianId,
        api_token: apiToken,
      };

      const response = await loadConfluenceData(request);

      set({
        loadResult: response,
        isLoading: false,
      });

      console.log('✅ Confluence 데이터 로드 완료:', response);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || '로드 실패';
      set({
        error: errorMessage,
        isLoading: false,
      });
      console.error('❌ 로드 실패:', err);
    }
  },

  // Confluence 상태 조회
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

  // 폼 초기화
  clearForm: () => {
    set({
      spaceKey: '',
      atlassianId: '',
      apiToken: '',
      error: null,
      loadResult: null,
      statusResult: null,
    });
  },

  // 에러 초기화
  clearError: () => set({ error: null }),
}));
