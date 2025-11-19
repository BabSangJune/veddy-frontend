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
                            // 사용자 메시지는 그냥 텍스트
                            message.content || (isStreaming ? '입력 중...' : '')
                        ) : (
                            // AI 메시지는 마크다운 렌더링
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    // 단락
                                    p: ({ node, ...props }) => (
                                        <p className={styles.paragraph} {...props} />
                                    ),

                                    // 제목
                                    h1: ({ node, ...props }) => (
                                        <h1 className={styles.heading1} {...props} />
                                    ),
                                    h2: ({ node, ...props }) => (
                                        <h2 className={styles.heading2} {...props} />
                                    ),
                                    h3: ({ node, ...props }) => (
                                        <h3 className={styles.heading3} {...props} />
                                    ),

                                    // 강조
                                    strong: ({ node, ...props }) => (
                                        <strong className={styles.strong} {...props} />
                                    ),
                                    em: ({ node, ...props }) => (
                                        <em className={styles.em} {...props} />
                                    ),

                                    // ✅ 코드 (타입 수정)
                                    code: ({ node, inline, className, children, ...props }: any) => {
                                        return inline ? (
                                            <code className={styles.inlineCode} {...props}>
                                                {children}
                                            </code>
                                        ) : (
                                            <code className={styles.codeBlock} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },

                                    // 링크
                                    a: ({ node, ...props }) => (
                                        <a
                                            className={styles.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            {...props}
                                        />
                                    ),

                                    // 리스트
                                    ul: ({ node, ...props }) => (
                                        <ul className={styles.list} {...props} />
                                    ),
                                    ol: ({ node, ...props }) => (
                                        <ol className={styles.orderedList} {...props} />
                                    ),
                                    li: ({ node, ...props }) => (
                                        <li className={styles.listItem} {...props} />
                                    ),

                                    // 구분선
                                    hr: ({ node, ...props }) => (
                                        <hr className={styles.divider} {...props} />
                                    ),

                                    // 인용
                                    blockquote: ({ node, ...props }) => (
                                        <blockquote className={styles.blockquote} {...props} />
                                    ),
                                }}
                            >
                                {message.content || (isStreaming ? '입력 중...' : '')}
                            </ReactMarkdown>
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
