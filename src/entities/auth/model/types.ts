import type { User as SupabaseUser } from '@supabase/supabase-js';

// ✨ AppUser: SupabaseUser + role
export type AppUser = Partial<SupabaseUser> & {
  role?: 'admin' | 'user' | string;
};

export type User = AppUser;

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
