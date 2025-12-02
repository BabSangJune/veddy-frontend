// src/features/chat/model/hooks/useHealthCheck.ts
import { useQuery } from '@tanstack/react-query';

import { healthCheck } from '../../api';

/**
 * 백엔드 헬스 체크 훅 (TanStack Query)
 */
export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: healthCheck,
    refetchInterval: 10000, // 10초마다 체크
    retry: 2,
  });
};
