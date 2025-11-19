// src/features/chat/ui/message-item/MessageItem.tsx
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message } from '@/entities/message';
import { formatSourceTitle, formatSimilarity } from '@/entities/message';
import * as styles from './MessageItem.css';

interface MessageItemProps {
    message: Message;
}

export const MessageItem = memo(
    ({ message }: MessageItemProps) => {
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
                        {isUser ? (
                            // 사용자 메시지 (마크다운 없음)
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {message.content}
                            </div>
                        ) : (
                            // AI 메시지 (마크다운 렌더링)
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        // ✅ p 태그: display block 유지, 줄바꿈 허용
                                        p: ({ node, ...props }) => (
                                            <p style={{ margin: 0, marginBottom: '8px', whiteSpace: 'pre-wrap' }} {...props} />
                                        ),
                                        h1: ({ node, ...props }) => (
                                            <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', marginTop: '12px' }} {...props} />
                                        ),
                                        h2: ({ node, ...props }) => (
                                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', marginTop: '12px' }} {...props} />
                                        ),
                                        h3: ({ node, ...props }) => (
                                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', marginTop: '10px' }} {...props} />
                                        ),
                                        strong: ({ node, ...props }) => (
                                            <strong style={{ color: '#1976d2', fontWeight: 700 }} {...props} />
                                        ),
                                        a: ({ node, ...props }) => (
                                            <a
                                                style={{ color: '#1976d2', textDecoration: 'underline', wordBreak: 'break-all' }}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                {...props}
                                            />
                                        ),
                                        ul: ({ node, ...props }) => (
                                            <ul style={{ marginLeft: '20px', marginBottom: '8px' }} {...props} />
                                        ),
                                        ol: ({ node, ...props }) => (
                                            <ol style={{ marginLeft: '20px', marginBottom: '8px' }} {...props} />
                                        ),
                                        li: ({ node, ...props }) => (
                                            <li style={{ marginBottom: '4px' }} {...props} />
                                        ),
                                    }}
                                >
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                        )}
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
                                    <div className={styles.sourceTitle}>
                                        {formatSourceTitle(source)}
                                    </div>
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
    },
    (prevProps, nextProps) => {
        return (
            prevProps.message.content === nextProps.message.content &&
            prevProps.message.status === nextProps.message.status
        );
    }
);

MessageItem.displayName = 'MessageItem';
