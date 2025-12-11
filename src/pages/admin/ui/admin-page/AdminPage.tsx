import { useState } from 'react';

import { ConfluenceLoadForm, ConfluenceProgress, ConfluenceStatus } from '@/features/admin';
import { SaveCredentialsRequest } from '@/features/admin/model';

import * as styles from './AdminPage.css';

export const AdminPage = () => {
  const [credentials, setCredentials] = useState<SaveCredentialsRequest | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [refreshStats, setRefreshStats] = useState(false);

  const handleStartLoad = (creds: SaveCredentialsRequest) => {
    setCredentials(creds);
    setShowProgress(true);
  };

  const handleLoadComplete = async () => {
    // 로드 완료 후 통계 새로고침
    setRefreshStats(!refreshStats);
    setShowProgress(false);
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>📋 VEDDY 관리자 페이지</h1>
          <p className={styles.subtitle}>Confluence 데이터를 관리하세요</p>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className={styles.main}>
        {/* Confluence 데이터 로드 섹션 */}
        <ConfluenceLoadForm onSuccess={handleStartLoad} />

        {/* 진행률 표시 */}
        {showProgress && credentials && (
          <ConfluenceProgress credentials={credentials} onComplete={handleLoadComplete} />
        )}

        {/* 상태 확인 섹션 */}
        <ConfluenceStatus key={refreshStats.toString()} />
      </main>
    </div>
  );
};
