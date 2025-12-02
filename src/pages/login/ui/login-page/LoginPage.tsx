import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { LoginForm } from '@/features/auth/ui/login-form';

import { useAuthStore } from '@/entities/auth';

import * as styles from './LoginPage.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { user, checkSession, error } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      console.log('[LoginPage] 세션 확인 중...');
      await checkSession();
    };
    initAuth();
  }, [checkSession]);

  useEffect(() => {
    console.log('[LoginPage] User 상태:', user);
    if (user) {
      console.log('[LoginPage] ✅ 사용자 인증됨, /chat으로 이동');
      navigate('/chat');
    }
  }, [user, navigate]);

  return (
    <div className={styles.container}>
      {error && <div className={styles.errorMessage}>에러: {error}</div>}
      <LoginForm />
    </div>
  );
};
