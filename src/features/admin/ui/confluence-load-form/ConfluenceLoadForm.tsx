import { useConfluenceStore } from '@/features/admin/model';
import { SaveCredentialsRequest } from '@/features/admin/model';

import * as styles from './ConfluenceLoadForm.css.ts';

interface ConfluenceLoadFormProps {
  onSuccess?: (credentials: SaveCredentialsRequest) => void;
}

export const ConfluenceLoadForm = ({ onSuccess }: ConfluenceLoadFormProps) => {
  const {
    spaceKey,
    atlassianId,
    apiToken,
    isLoading,
    error,
    loadResult,
    setSpaceKey,
    setAtlassianId,
    setApiToken,
    loadConfluenceData,
    clearForm,
  } = useConfluenceStore();

  const handleLoadClick = async () => {
    await loadConfluenceData();

    // ✅ SSE 진행률 표시용 credentials 전달
    if (onSuccess) {
      onSuccess({
        space_key: spaceKey,
        atlassian_id: atlassianId,
        api_token: apiToken,
      });
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>🚀 Confluence 데이터 로드</h2>

      <div className={styles.formGroup}>
        <label htmlFor="space-key" className={styles.label}>
          Space Key *
        </label>
        <input
          id="space-key"
          type="text"
          placeholder="예: TxYP20CKMWxg"
          value={spaceKey}
          onChange={(e) => setSpaceKey(e.target.value)}
          disabled={isLoading}
          className={styles.input}
        />
        <small className={styles.helpText}>Confluence Space의 고유 키</small>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="atlassian-id" className={styles.label}>
          Atlassian ID *
        </label>
        <input
          id="atlassian-id"
          type="email"
          placeholder="예: user@example.com"
          value={atlassianId}
          onChange={(e) => setAtlassianId(e.target.value)}
          disabled={isLoading}
          className={styles.input}
        />
        <small className={styles.helpText}>Confluence 로그인 이메일</small>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="api-token" className={styles.label}>
          API Token *
        </label>
        <input
          id="api-token"
          type="password"
          placeholder="API Token 입력"
          value={apiToken}
          onChange={(e) => setApiToken(e.target.value)}
          disabled={isLoading}
          className={styles.input}
        />
        <small className={styles.helpText}>
          <a
            href="https://id.atlassian.com/manage/api-tokens"
            target="_blank"
            rel="noreferrer"
            className={styles.helpLink}
          >
            API Token 생성하기
          </a>
        </small>
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={handleLoadClick} disabled={isLoading} className={styles.buttonPrimary}>
          {isLoading ? '⏳ 로드 중...' : '🚀 데이터 로드'}
        </button>
        <button onClick={clearForm} disabled={isLoading} className={styles.buttonSecondary}>
          🔄 초기화
        </button>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className={styles.alertError}>
          <span>❌ {error}</span>
        </div>
      )}

      {/* 로드 결과 */}
      {loadResult && (
        <div className={styles.alertSuccess}>
          <h3 className={styles.alertTitle}>✅ {loadResult.message}</h3>
          <ul className={styles.alertList}>
            <li className={styles.alertListItem}>
              <span className={styles.alertListItemStrong}>Space Key:</span> {loadResult.space_key}
            </li>
            <li className={styles.alertListItem}>
              <span className={styles.alertListItemStrong}>전체 페이지:</span>{' '}
              {loadResult.total_pages}개
            </li>
            <li className={styles.alertListItem}>
              <span className={styles.alertListItemStrong}>성공:</span> {loadResult.success_count}개
            </li>
            <li className={styles.alertListItem}>
              <span className={styles.alertListItemStrong}>실패:</span> {loadResult.error_count}개
            </li>
            <li className={styles.alertListItem}>
              <span className={styles.alertListItemStrong}>생성된 청크:</span>{' '}
              {loadResult.total_chunks}개
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};
