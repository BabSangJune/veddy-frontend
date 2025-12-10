// src/features/admin/ui/confluence-status/ConfluenceStatus.tsx

import { useConfluenceStore } from '@/features/admin/model';

import * as styles from './ConfluenceStatus.css.ts';

export const ConfluenceStatus = () => {
  const { isStatusLoading, statusResult, getConfluenceStatus } = useConfluenceStore();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>📊 데이터 상태 확인</h2>

      <button onClick={getConfluenceStatus} disabled={isStatusLoading} className={styles.button}>
        {isStatusLoading ? '⏳ 조회 중...' : '🔍 상태 확인'}
      </button>

      {/* 상태 결과 */}
      {statusResult && (
        <div className={styles.statusResult}>
          <div className={styles.statusSummary}>
            <div className={styles.statBox}>
              <h4 className={styles.statBoxTitle}>📄 전체 문서</h4>
              <p className={styles.statNumber}>{statusResult.total_documents}</p>
            </div>
            <div className={styles.statBox}>
              <h4 className={styles.statBoxTitle}>🏢 Space 수</h4>
              <p className={styles.statNumber}>{statusResult.total_spaces}</p>
            </div>
          </div>

          {Object.keys(statusResult.space_stats).length > 0 && (
            <div className={styles.spaceStats}>
              <h3 className={styles.spaceStatsTitle}>📍 Space별 통계</h3>
              {Object.entries(statusResult.space_stats).map(
                ([spaceKey, spaceData]: [string, any]) => (
                  <div key={spaceKey} className={styles.spaceStatItem}>
                    <h4 className={styles.spaceStatItemTitle}>{spaceKey}</h4>
                    <p className={styles.spaceStatItemText}>
                      <strong>문서 개수:</strong> {spaceData.count}개
                    </p>
                    <div className={styles.docList}>
                      {spaceData.docs.slice(0, 5).map((doc: any) => (
                        <span key={doc.id} className={styles.docTag}>
                          {doc.title}
                        </span>
                      ))}
                      {spaceData.docs.length > 5 && (
                        <span className={styles.docTagMore}>+{spaceData.docs.length - 5}개</span>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
