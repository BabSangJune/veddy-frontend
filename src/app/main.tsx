import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { supabase } from '@/shared/lib/supabase';

import App from './App.tsx';
import { ApiProvider } from './providers/ApiProvider';
import { QueryProvider } from './providers/QueryProvider';
import '@/shared/config/styles/global.css.ts';

// Supabase Auth 변경 리스너
supabase.auth.onAuthStateChange((event, session) => {
  console.log('[AUTH] Event:', event, 'Session:', session);

  if (event === 'SIGNED_IN') {
    console.log('[AUTH] ✅ 사용자 로그인 성공');
  } else if (event === 'SIGNED_OUT') {
    console.log('[AUTH] 🚪 사용자 로그아웃');
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </QueryProvider>
  </StrictMode>,
);
