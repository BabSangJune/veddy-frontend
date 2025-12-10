// src/pages/admin/ui/admin-page/AdminPage.tsx

import { ConfluenceLoadForm, ConfluenceStatus } from '@/features/admin';

import * as styles from './AdminPage.css';

export const AdminPage = () => {
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
        <ConfluenceLoadForm />

        {/* 상태 확인 섹션 */}
        <ConfluenceStatus />
      </main>
    </div>
  );
};
