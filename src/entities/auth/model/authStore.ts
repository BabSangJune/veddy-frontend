import { create } from 'zustand';

import { supabase } from '@/shared/lib/supabase';

import type { AuthState, User } from './types';

export const useAuthStore = create<
  AuthState & {
    loginWithMicrosoft: () => Promise<void>;
    checkSession: () => Promise<void>;
    logout: () => Promise<void>;
    getToken: () => string | null;
  }
>((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  loginWithMicrosoft: async () => {
    set({ loading: true, error: null });
    try {
      console.log('[loginWithMicrosoft] 🔐 Microsoft 로그인 시작');

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      console.log('[loginWithMicrosoft] 응답:', { data, error });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('[loginWithMicrosoft] ❌ 에러:', error);
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        loading: false,
      });
    }
  },

  checkSession: async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        // ✨ public.users에서 role 가져오기
        let role: string = 'user';

        try {
          const { data: userRow } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (userRow?.role) {
            role = userRow.role;
          }
        } catch (e) {
          console.warn('[checkSession] users 조회 실패:', e);
        }

        const authUser: User = {
          ...session.user,
          role, // ✨ role 추가
        };

        set({
          user: authUser,
          token: session.access_token,
        });
      }
    } catch (error) {
      console.error('Session check error:', error);
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await supabase.auth.signOut();
      set({ user: null, token: null, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Logout failed',
        loading: false,
      });
    }
  },

  getToken: () => {
    return get().token;
  },
}));
