// src/app/router/PrivateRoute.tsx

import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/entities/auth';

import * as styles from './PrivateRoute.css';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, checkSession } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // 한 번만 실행되도록 제어
    if (initialized) return;

    const initSession = async () => {
      console.log('[PrivateRoute] 세션 확인 중...');
      await checkSession();
      setLoading(false);
      setInitialized(true);
    };

    initSession();
  }, [initialized, checkSession]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>로딩 중...</p>
      </div>
    );
  }

  console.log('[PrivateRoute] User 확인:', user ? '있음' : '없음');
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// ✨ AdminRoute 추가
export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, checkSession } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // 한 번만 실행되도록 제어
    if (initialized) return;

    const initSession = async () => {
      console.log('[AdminRoute] 세션 확인 중...');
      await checkSession();
      setLoading(false);
      setInitialized(true);
    };

    initSession();
  }, [initialized, checkSession]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>관리자 인증 중...</p>
      </div>
    );
  }

  console.log('[AdminRoute] User 확인:', user ? '있음' : '없음', 'Role:', user?.role);

  // 로그인 안 됨
  if (!user) {
    return <Navigate to="/login" />;
  }

  // admin이 아님
  if (user.role !== 'admin') {
    console.log('[AdminRoute] ❌ Admin 권한 없음, /chat으로 리다이렉트');
    return <Navigate to="/chat" />;
  }

  // admin 맞음
  return <>{children}</>;
};
