import { ConfluenceLoadForm, ConfluenceProgress, ConfluenceStatus } from '@/features/admin';
import { useConfluenceStore } from '@/features/admin/model';

import * as styles from './AdminPage.css';

export const AdminPage = () => {
  const { isLoading } = useConfluenceStore();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>📋 VEDDY 관리자 페이지</h1>
          <p className={styles.subtitle}>Confluence 데이터를 관리하세요</p>
        </div>
      </header>

      <main className={styles.main}>
        <ConfluenceLoadForm />

        {isLoading && <ConfluenceProgress />}

        <ConfluenceStatus />
      </main>
    </div>
  );
};
