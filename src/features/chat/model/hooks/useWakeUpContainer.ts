import { useState, useCallback } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import type { ContainerStatus } from '@/entities/health';

import { wakeUpContainer, getContainerStatus } from '../../api';

interface UseWakeUpContainerReturn {
  containerStatus: ContainerStatus;
  isWakingUp: boolean;
  handleWakeUp: () => Promise<void>;
  refetchStatus: () => void;
  error: Error | null;
}

/**
 * 🔌 컨테이너 깨우기 Hook
 */
export const useWakeUpContainer = (): UseWakeUpContainerReturn => {
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 컨테이너 상태 조회
  const { data: statusData, refetch: refetchStatus } = useQuery({
    queryKey: ['containerStatus'],
    queryFn: getContainerStatus,
    refetchInterval: 5000,
    retry: 1,
  });

  // Wake-up 뮤테이션
  const { mutate: wakeUp } = useMutation({
    mutationFn: wakeUpContainer,
    onMutate: () => {
      setIsWakingUp(true);
      setError(null);
    },
    onSuccess: async () => {
      // wake-up 후 2초 대기 후 상태 확인
      for (let i = 0; i < 15; i++) {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
          const status = await getContainerStatus();

          if (status.status === 'healthy') {
            setIsWakingUp(false);
            refetchStatus();
            break;
          }
        } catch {
          // 계속 재시도
        }
      }

      setIsWakingUp(false);
      refetchStatus();
    },
    onError: (err) => {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setIsWakingUp(false);
    },
  });

  const handleWakeUp = useCallback(async () => {
    if (isWakingUp) return;
    wakeUp();
  }, [wakeUp, isWakingUp]);

  return {
    containerStatus: (statusData?.status as ContainerStatus) || 'idle',
    isWakingUp,
    handleWakeUp,
    refetchStatus: () => refetchStatus(),
    error,
  };
};
