import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { useAuthStore } from '@/entities/auth';
import { LoginPage } from '@/pages/login';
import { ChatPage } from '@/pages/chat';
import { PrivateRoute } from './PrivateRoute';

// 🆕 인증 콜백 핸들러 (수정)
const AuthCallback = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('[AuthCallback] URL:', window.location.href);

        // Supabase가 URL에서 자동으로 세션 처리
        const { data, error } = await supabase.auth.getSession();

        console.log('[AuthCallback] getSession 결과:', { data, error });

        if (error) {
          console.error('[AuthCallback] ❌ 에러:', error);
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
          return;
        }

        if (data?.session?.user) {
          console.log('[AuthCallback] ✅ 세션 설정 완료:', data.session.user);

          // authStore 업데이트
          useAuthStore.setState({
            user: data.session.user as any,
          });

          // 채팅 페이지로 이동
          setTimeout(() => {
            window.location.href = '/chat';
          }, 500);
        } else {
          console.warn('[AuthCallback] 세션 없음');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
        }
      } catch (error) {
        console.error('[AuthCallback] 예상치 못한 에러:', error);
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        🔐 인증 처리 중...
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      인증 처리 중...
    </div>
  );
};

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/chat" />} />
    </Routes>
  </BrowserRouter>
);
