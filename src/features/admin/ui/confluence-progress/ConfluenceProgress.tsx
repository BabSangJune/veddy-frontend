// src/features/admin/ui/confluence-progress/ConfluenceProgress.tsx

import React from 'react';

import { useConfluenceStore } from '@/features/admin/model';

import * as styles from './ConfluenceProgress.css';

export const ConfluenceProgress: React.FC = () => {
  const { progressEvents, currentProgress, isLoading, error } = useConfluenceStore();

  // 아직 아무 것도 시작 안 했으면 안 보이게
  if (!isLoading && progressEvents.length === 0) {
    return null;
  }

  const progress = progressEvents[progressEvents.length - 1] ?? null;

  const status = progress?.status ?? (isLoading ? 'processing' : 'idle');
  const progressPercent = currentProgress ?? 0;
  const currentPage = progress?.current_page ?? '';
  const processedPages = progress?.processed_pages ?? 0;
  const totalPages = progress?.total_pages ?? 0;

  const etaSeconds = progress?.eta_seconds ?? 0;
  const etaMinutes = Math.floor(etaSeconds / 60);
  const etaSecondsRemainder = Math.floor(etaSeconds % 60);
  const etaText =
    etaMinutes > 0 ? `약 ${etaMinutes}분 ${etaSecondsRemainder}초` : `약 ${etaSecondsRemainder}초`;

  const elapsedSeconds = progress?.elapsed_time ?? 0;
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedSecondsRemainder = Math.floor(elapsedSeconds % 60);
  const elapsedText =
    elapsedMinutes > 0
      ? `${elapsedMinutes}분 ${elapsedSecondsRemainder}초`
      : `${elapsedSecondsRemainder}초`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>📚 Confluence 데이터 로드 중...</h3>
        <p className={styles.subtitle}>
          {processedPages} / {totalPages} 문서 처리 중
        </p>
      </div>

      <div className={styles.barContainer}>
        <div className={styles.barBackground}>
          <div className={styles.barFill} style={{ width: `${progressPercent}%` }}>
            <span className={styles.barPercent}>{Math.round(progressPercent)}%</span>
          </div>
        </div>
      </div>

      {status === 'processing' && currentPage && (
        <div className={styles.currentPageBox}>
          <p className={styles.currentPageLabel}>🔄 처리 중인 페이지:</p>
          <p className={styles.currentPageTitle}>{currentPage}</p>
        </div>
      )}

      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statIcon}>⏱️</span>
          <span className={styles.statLabel}>소요 시간:</span>
          <span className={styles.statValue}>{elapsedText}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statIcon}>⏳</span>
          <span className={styles.statLabel}>예상 남은 시간:</span>
          <span className={styles.statValue}>{etaText}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statIcon}>📦</span>
          <span className={styles.statLabel}>청크 수:</span>
          <span className={styles.statValue}>{progress?.total_chunks ?? 0}개</span>
        </div>
      </div>

      {status === 'completed' && (
        <div className={styles.successBox}>
          <h4 className={styles.successTitle}>✅ 완료!</h4>
          <p className={styles.successText}>
            성공: <span className={styles.successBold}>{progress?.success_count ?? 0}</span> | 스킵:{' '}
            <span className={styles.successBold}>{progress?.skip_count ?? 0}</span> | 실패:{' '}
            <span className={styles.successBold}>{progress?.error_count ?? 0}</span>
          </p>
          <p className={styles.successText}>
            총 <span className={styles.successBold}>{progress?.total_chunks ?? 0}</span>개 청크 생성
          </p>
        </div>
      )}

      {(status === 'error' || error) && (
        <div className={styles.errorBox}>
          <h4 className={styles.errorTitle}>❌ 오류 발생</h4>
          <p className={styles.errorText}>{error || progress?.message || '알 수 없는 오류'}</p>
        </div>
      )}
    </div>
  );
};
