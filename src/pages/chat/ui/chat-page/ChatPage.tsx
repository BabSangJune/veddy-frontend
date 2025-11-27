// src/pages/chat/ChatPage.tsx
import { ChatWindow, StatusBar } from '@/widgets';
import * as styles from './ChatPage.css.ts';

export const ChatPage = () => {
  return (
    <div className={styles.container}>
      {/* 상태 바 */}
      <StatusBar />

      {/* 메인 콘텐츠 */}
      <main className={styles.main}>
        <div className={styles.chatContainer}>
          <ChatWindow />
        </div>
      </main>
    </div>
  );
};
