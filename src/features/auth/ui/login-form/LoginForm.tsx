import { useAuthStore } from '@/entities/auth';
import * as styles from './LoginForm.css';

export const LoginForm = () => {
  const { loading, loginWithMicrosoft, error } = useAuthStore();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🚀 VEDDY</h1>
      <p className={styles.subtitle}>Vessellink AI Assistant</p>
      <p className={styles.description}>
        Microsoft 365 계정으로 로그인하세요
      </p>

      {error && (
        <div className={styles.errorBox}>
          {error}
        </div>
      )}

      <button
        onClick={loginWithMicrosoft}
        disabled={loading}
        className={styles.loginButton}
      >
        {loading ? '로그인 중...' : '🔐 Microsoft 365로 로그인'}
      </button>

      <p className={styles.footer}>
        사내 Microsoft 365 계정만 사용 가능합니다
      </p>
    </div>
  );
};
