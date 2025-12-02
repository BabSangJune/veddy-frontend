// src/features/chat/model/hooks/useChatStream.ts
import { useCallback } from 'react';

import { useAuthStore } from '@/entities/auth'; // ✅ 추가
import {
  completeMessage,
  createAssistantMessage,
  createErrorMessage,
  createUserMessage,
} from '@/entities/message';

import { streamChat } from '../../api';
import { useChatStore } from '../chatStore';

export const useChatStream = () => {
  const { addMessage, updateLastMessage, setLoading, setError } = useChatStore();

  const sendMessage = useCallback(
    async (question: string, tableMode: boolean = false) => {
      try {
        console.log('[useChatStream] 메시지 전송:', question);
        console.log('[useChatStream] 📊 표 모드:', tableMode);

        setError(null);
        setLoading(true);

        const userMessage = createUserMessage(question);
        addMessage(userMessage);

        const assistantMessage = createAssistantMessage('');
        addMessage(assistantMessage);

        let fullContent = '';

        // ✅ 실제 user_id 가져오기
        const currentUser = useAuthStore.getState().user;
        const userId = currentUser?.id || currentUser?.email || 'anonymous';

        await streamChat(
          {
            user_id: userId, // ✅ 실제 user_id 사용
            query: question,
            table_mode: tableMode,
          },
          (token) => {
            fullContent += token;
            updateLastMessage((msg) => ({
              ...msg,
              content: fullContent,
              status: 'streaming' as const,
            }));
          },
          (sources) => {
            console.log('[useChatStream] 완료, 출처:', sources);
            updateLastMessage((msg) =>
              completeMessage({ ...msg, content: fullContent, status: 'sent' as const }, sources),
            );
            setLoading(false);
          },
          (error) => {
            console.error('[useChatStream] 에러:', error);
            setError(error.message);
            updateLastMessage(() => createErrorMessage(error.message));
            setLoading(false);
          },
        );
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('[useChatStream] Catch 에러:', error);
        setError(errorMessage);
        addMessage(createErrorMessage(errorMessage));
        setLoading(false);
      }
    },
    [addMessage, updateLastMessage, setLoading, setError],
  );

  return { sendMessage };
};
