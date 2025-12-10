import { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AdminPage } from '@/pages/admin';
import { ChatPage } from '@/pages/chat';
import { LoginPage } from '@/pages/login';

import { useAuthStore } from '@/entities/auth';

import { supabase } from '@/shared/lib/supabase';

import { PrivateRoute, AdminRoute } from './PrivateRoute'; // ✨ AdminRoute 추가

// 🆕 인증 콜백 핸들러 (수정)
const AuthCallback = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('[AuthCallback] URL:', window.location.href);

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

          const sessionUser = data.session.user;

          // ✨ public.users에서 role 가져오기
          let role: string = 'user';

          try {
            const { data: userRow } = await supabase
              .from('users')
              .select('role')
              .eq('id', sessionUser.id)
              .single();

            if (userRow?.role) {
              role = userRow.role;
            }
          } catch (e) {
            console.warn('[AuthCallback] users 조회 실패:', e);
          }

          useAuthStore.setState({
            user: {
              ...sessionUser,
              role, // ✨ role 추가
            },
          });

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
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>🔐 인증 처리 중...</div>;
  }

  return <div style={{ textAlign: 'center', marginTop: '50px' }}>인증 처리 중...</div>;
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

      {/* ✨ Admin 라우트 추가 */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />

      <Route path="/" element={<Navigate to="/chat" />} />
    </Routes>
  </BrowserRouter>
);
