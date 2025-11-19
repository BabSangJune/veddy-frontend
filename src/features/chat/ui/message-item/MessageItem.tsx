// src/features/chat/ui/message-item/MessageItem.tsx
import { memo } from 'react';
import type { Message } from '@/entities/message';
import { formatSourceTitle, formatSimilarity } from '@/entities/message';
import * as styles from './MessageItem.css';

interface MessageItemProps {
  message: Message;
}

export const MessageItem = memo(({ message }: MessageItemProps) => {
  const isUser = message.role === 'user';
  const isStreaming = message.status === 'streaming';
  const isError = message.status === 'error';

  return (
    <div className={styles.container}>
      {!isUser && (
        <div className={styles.avatar}>
          <span className={styles.avatarText}>베디</span>
        </div>
      )}

      <div className={isUser ? styles.userBubble : styles.assistantBubble}>
        <div className={styles.content}>
          {message.content || (isStreaming ? '입력 중...' : '')}
          {isStreaming && <span className={styles.cursor}>▊</span>}
        </div>

        <div className={styles.timestamp}>
          {message.timestamp.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>

        {isError && message.error && (
          <div className={styles.error}>⚠️ {message.error}</div>
        )}

        {message.sources && message.sources.length > 0 && (
          <div className={styles.sources}>
            <div className={styles.sourcesTitle}>📚 참고 문서</div>
            {message.sources.map((source) => (
              <div key={source.id} className={styles.sourceItem}>
                <div className={styles.sourceTitle}>{formatSourceTitle(source)}</div>
                <div className={styles.sourceMeta}>
                  유사도: {formatSimilarity(source.similarity)} | 출처:{' '}
                  {source.metadata?.source}
                </div>
                {source.metadata?.url && (
                  <a
                    href={source.metadata.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceLink}
                  >
                    문서 보기 →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // ✅ 메모이제이션: content가 같으면 리렌더링 스킵
  return prevProps.message.content === nextProps.message.content &&
    prevProps.message.status === nextProps.message.status;
});

MessageItem.displayName = 'MessageItem';
