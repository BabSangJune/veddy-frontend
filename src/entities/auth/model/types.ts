import type { User as SupabaseUser } from '@supabase/supabase-js';

export type User = Partial<SupabaseUser>; // 🆕 Partial로 변경

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  loginWithMicrosoft: () => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  getToken: () => string | null;
}
