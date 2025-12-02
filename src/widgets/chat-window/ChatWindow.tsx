// src/widgets/chat-window/ChatWindow.tsx
import { useChatStore, useChatStream, ChatInput, MessageList } from '@/features/chat';

import * as styles from './ChatWindow.css.ts';

export const ChatWindow = () => {
  const { messages, isLoading, error, clearMessages } = useChatStore();
  const { sendMessage } = useChatStream();

  const handleClearChat = () => {
    if (window.confirm('대화 내용을 모두 삭제하시겠습니까?')) {
      clearMessages();
    }
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <img src="/images/veddy-slogan.png" alt="VEDDY" className={styles.avatarIcon} />
            <div>
              <h1 className={styles.title}>베디 (VEDDY) - 너의 하루를 밝게!</h1>
              <p className={styles.subtitle}>Vessellink's Buddy</p>
            </div>
          </div>
          <button
            className={styles.clearButton}
            onClick={handleClearChat}
            disabled={messages.length === 0}
            type="button"
          >
            대화 지우기
          </button>
        </div>
      </header>

      {/* 에러 배너 */}
      {error && (
        <div className={styles.errorBanner}>
          <span className={styles.errorIcon}>⚠️</span>
          <span className={styles.errorText}>{error}</span>
        </div>
      )}

      {/* 메시지 목록 */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* 입력창 */}
      <ChatInput
        onSend={sendMessage}
        disabled={isLoading}
        placeholder="베디에게 질문하세요... (Shift+Enter로 줄바꿈)"
      />
    </div>
  );
};
