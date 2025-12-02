// src/app/providers/ApiProvider.tsx
import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth';

import { setupAuthInterceptor, setupResponseInterceptor } from '@/shared/lib/api/axiosClient';

export function ApiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 앱 시작 시 인터셉터 설정
    setupAuthInterceptor(() => useAuthStore.getState().getToken());
    setupResponseInterceptor(() => {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    });
  }, []);

  return <>{children}</>;
}
