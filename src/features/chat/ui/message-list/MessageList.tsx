// src/features/chat/ui/MessageList/MessageList.tsx
import { useEffect, useRef } from 'react';
import type { Message } from '@/entities/message';
import * as styles from './MessageList.css';
import { MessageItem } from '@/features/chat/ui/message-item';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 새 메시지 시 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.container} ref={scrollRef}>
      {messages.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>💬</div>
          <div className={styles.emptyTitle}>베디와 대화를 시작해보세요!</div>
          <div className={styles.emptyDescription}>
            문서 검색, 규정 안내 등 무엇이든 물어보세요.
          </div>
        </div>
      ) : (
        <div className={styles.messageList}>
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className={styles.loadingIndicator}>베디가 생각 중입니다...</div>
          )}
        </div>
      )}
    </div>
  );
};
