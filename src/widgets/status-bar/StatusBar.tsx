import { useHealthCheck } from '@/features/chat';

import { useAuthStore } from '@/entities/auth';

import * as styles from './StatusBar.css';

export const StatusBar = () => {
  const { data: healthData, isLoading, isError } = useHealthCheck();
  const { user, logout } = useAuthStore();

  const isHealthy = healthData?.status === 'healthy' || healthData?.status === 'ok';

  const status: 'success' | 'warning' | 'error' = isError
    ? 'error'
    : isHealthy
      ? 'success'
      : 'warning';

  const statusMessage = isLoading
    ? '연결 확인 중...'
    : isError
      ? '❌ 백엔드 연결 안 됨'
      : healthData?.message || '✅ 백엔드 정상 작동';

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 상태 정보 섹션 (한 개의 div로 묶음) */}
        <div className={styles.statusSection}>
          <div className={styles.statusDot[status]} />
          <span className={styles.text}>{statusMessage}</span>
        </div>

        {/* 사용자 섹션 */}
        <div className={styles.userSection}>
          <span className={styles.email}>{user?.user_metadata?.email || user?.id || 'User'}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};
