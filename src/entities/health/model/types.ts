/**
 * 🏥 컨테이너 헬스 상태 타입
 */

export type ContainerStatus = 'healthy' | 'warming-up' | 'idle' | 'error';

export interface HealthCheckResponse {
  status: 'healthy' | 'ok' | 'degraded' | 'down';
  timestamp: string;
  environment: string;
  message?: string;
  checks?: Record<string, any>;
  response_time_ms?: number;
}

export interface ContainerStatusResponse {
  status: ContainerStatus;
  azure_status?: Record<string, any>;
  timestamp: string;
  provider: string;
}

export interface WakeUpResponse {
  status: ContainerStatus;
  message: string;
  azure_response?: Record<string, any>;
  estimated_time_seconds?: number;
}
