// src/features/chat/model/hooks/useChatStream.ts
import { useCallback } from 'react';
import {
  createUserMessage,
  createAssistantMessage,
  // updateMessageContent,
  completeMessage,
  createErrorMessage,
} from '@/entities/message';
import { streamChat } from '../../api';
import { useChatStore } from '../chatStore';

export const useChatStream = () => {
  const {
    addMessage,
    updateLastMessage,
    setCurrentStreamingContent,
    appendToCurrentStream,
    setLoading,
    setError,
  } = useChatStore();

  const sendMessage = useCallback(
    async (question: string) => {
      try {
        console.log('[useChatStream] 메시지 전송:', question);

        setError(null);
        setLoading(true);
        setCurrentStreamingContent('');

        const userMessage = createUserMessage(question);
        addMessage(userMessage);

        const assistantMessage = createAssistantMessage('');
        addMessage(assistantMessage);

        let fullContent = '';  // ✅ 전체 내용 누적

        await streamChat(
          {
            user_id: 'user-default',
            query: question,
          },
          (token) => {
            console.log('[useChatStream] 토큰 수신:', token);

            // ✅ 토큰을 누적
            fullContent += token;

            // ✅ 마지막 메시지의 content만 업데이트 (한 번만)
            updateLastMessage((msg) => ({
              ...msg,
              content: fullContent,
              status: 'streaming' as const,
            }));
          },
          (sources) => {
            console.log('[useChatStream] 완료, 출처:', sources);

            updateLastMessage((msg) =>
              completeMessage(
                { ...msg, content: fullContent, status: 'sent' as const },
                sources
              )
            );

            setCurrentStreamingContent('');
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
    [addMessage, updateLastMessage, setCurrentStreamingContent, appendToCurrentStream, setLoading, setError],
  );

  return { sendMessage };
};
