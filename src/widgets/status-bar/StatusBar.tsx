// src/widgets/status-bar/StatusBar.tsx

import { useNavigate } from 'react-router-dom'; // ✨ 추가

import { useHealthCheck } from '@/features/chat';
import { useWakeUpContainer } from '@/features/chat/model/hooks';

import { useAuthStore } from '@/entities/auth';

import * as styles from './StatusBar.css';

export const StatusBar = () => {
  const navigate = useNavigate(); // ✨ 추가
  const { data: healthData, isLoading, isError } = useHealthCheck();
  const { containerStatus, isWakingUp, handleWakeUp, error: wakeUpError } = useWakeUpContainer();
  const { user, logout } = useAuthStore();

  let status: 'success' | 'warning' | 'error';
  let statusMessage: string;
  let shouldShowWakeUpButton = false;

  if (isWakingUp) {
    status = 'warning';
    statusMessage = '⏳ 컨테이너 시작 중... (약 2~3분)';
  } else if (containerStatus === 'warming-up') {
    status = 'warning';
    statusMessage = '⏳ 컨테이너 시작 중... (약 2~3분)';
  } else if (wakeUpError) {
    status = 'error';
    statusMessage = '❌ 컨테이너 시작 실패';
    shouldShowWakeUpButton = true;
  } else if (isError) {
    status = 'error';
    statusMessage = '❌ 백엔드 연결 안 됨';
    shouldShowWakeUpButton = true;
  } else if (containerStatus === 'error') {
    status = 'error';
    statusMessage = '❌ 컨테이너 에러';
    shouldShowWakeUpButton = true;
  } else if (containerStatus === 'idle') {
    status = 'warning';
    statusMessage = '💤 컨테이너 절전 중 (깨우기)';
    shouldShowWakeUpButton = true;
  } else if (isLoading) {
    status = 'warning';
    statusMessage = '연결 확인 중...';
  } else if (healthData?.status === 'healthy' || healthData?.status === 'ok') {
    status = 'success';
    statusMessage = '✅ 백엔드 정상 작동';
  } else {
    status = 'warning';
    statusMessage = healthData?.message || '⚠️ 상태 확인 중...';
  }

  const handleLogout = async () => {
    await logout();
  };

  const handleGoAdmin = () => {
    navigate('/admin');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.statusSection}>
          <div className={styles.statusDot[status]} />
          <span className={styles.text}>{statusMessage}</span>

          {shouldShowWakeUpButton && (
            <button
              onClick={handleWakeUp}
              disabled={isWakingUp}
              className={styles.wakeUpButton}
              title="컨테이너를 깨워서 사용 가능하게 만듭니다"
            >
              {isWakingUp ? '⏳ 시작 중...' : '🔌 깨우기'}
            </button>
          )}
        </div>

        <div className={styles.userSection}>
          {/* ✨ Admin 버튼 - admin일 때만 노출 */}
          {user?.role === 'admin' && (
            <button
              onClick={handleGoAdmin}
              className={styles.adminButton}
              title="관리자 페이지로 이동"
            >
              📋 관리자
            </button>
          )}

          <span className={styles.email}>{user?.user_metadata?.email || user?.id || 'User'}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};
