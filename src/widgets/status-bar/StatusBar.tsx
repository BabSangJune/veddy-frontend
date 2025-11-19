// src/widgets/status-bar/StatusBar.tsx
import { useHealthCheck } from '@/features/chat';
import * as styles from './StatusBar.css';

export const StatusBar = () => {
  const { data: healthData, isLoading, isError } = useHealthCheck();

  // ✅ "healthy" 또는 "ok" 모두 허용
  const isHealthy = healthData?.status === 'healthy' || healthData?.status === 'ok';

  const status: 'success' | 'warning' | 'error' = isError
    ? 'error'
    : isHealthy
      ? 'success'
      : 'warning';

  // 상태 메시지 결정
  const statusMessage = isLoading
    ? '연결 확인 중...'
    : isError
      ? '❌ 백엔드 연결 안 됨'
      : healthData?.message || '✅ 백엔드 정상 작동';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.statusDot[status]} />
        <span className={styles.text}>{statusMessage}</span>
      </div>
    </div>
  );
};
