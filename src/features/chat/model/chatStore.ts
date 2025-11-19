// src/features/chat/model/chatStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Message } from '@/entities/message';

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentStreamingContent: string;
  error: string | null;

  addMessage: (message: Message) => void;
  updateLastMessage: (updater: (msg: Message) => Message) => void;
  appendToCurrentStream: (token: string) => void;
  setCurrentStreamingContent: (content: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  reset: () => void;
}

const initialState = {
  messages: [],
  isLoading: false,
  currentStreamingContent: '',
  error: null,
};

export const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      ...initialState,

      addMessage: (message) =>
        set((state) => {
          console.log('[Store] 메시지 추가:', message.role);
          return {
            messages: [...state.messages, message],
          };
        }),

      // ✅ 마지막 메시지 업데이트 (최적화)
      updateLastMessage: (updater) =>
        set((state) => {
          if (state.messages.length === 0) {
            console.warn('[Store] 업데이트할 메시지 없음');
            return state;
          }

          const messages = [...state.messages];
          const lastIndex = messages.length - 1;
          const oldContent = messages[lastIndex].content;

          messages[lastIndex] = updater(messages[lastIndex]);

          // ✅ 내용이 실제로 변경되었을 때만 업데이트
          if (oldContent !== messages[lastIndex].content) {
            console.log('[Store] 메시지 업데이트:', messages[lastIndex].content.substring(0, 30) + '...');
          }

          return { messages };
        }),

      appendToCurrentStream: (token) =>
        set((state) => ({
          currentStreamingContent: state.currentStreamingContent + token,
        })),

      setCurrentStreamingContent: (content) =>
        set({ currentStreamingContent: content }),

      setLoading: (loading) => {
        console.log('[Store] 로딩:', loading);
        return set({ isLoading: loading });
      },

      setError: (error) => {
        if (error) {
          console.error('[Store] 에러:', error);
        }
        return set({ error });
      },

      clearMessages: () => {
        console.log('[Store] 메시지 초기화');
        return set({
          messages: [],
          currentStreamingContent: '',
          error: null,
        });
      },

      reset: () => set(initialState),
    }),
    { name: 'ChatStore' },
  ),
);
