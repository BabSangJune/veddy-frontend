import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/entities/auth';

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        로딩 중...
      </div>
    );
  }

  console.log('[PrivateRoute] User 확인:', user ? '있음' : '없음');
  return user ? <>{children}</> : <Navigate to="/login" />;
};
