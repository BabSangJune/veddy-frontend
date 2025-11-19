// src/app/App.tsx
import {
  createUserMessage,
  createAssistantMessage,
  updateMessageContent,
  completeMessage,
  formatSourceTitle,
  formatSimilarity,
  type SourceDocument,
} from '@entities/message';

function App() {
  // 테스트 데이터
  const userMsg = createUserMessage('베디, 휴가 규정 알려줘');

  let assistantMsg = createAssistantMessage();
  assistantMsg = updateMessageContent(assistantMsg, '안녕하세요! ');
  assistantMsg = updateMessageContent(assistantMsg, '휴가 규정은 다음과 같습니다...');

  const mockSources: SourceDocument[] = [
    {
      id: 'chunk-123',
      documentId: 'doc-abc',
      title: '인사규정',
      content: '연차는 입사 1년 후 15일 발생...',
      chunkNumber: 3,
      similarity: 0.89,
      metadata: {
        source: 'confluence',
        url: 'https://confluence.vessellink.com/hr-policy',
      },
    },
  ];

  const completedMsg = completeMessage(assistantMsg, mockSources);

  return (
    <div style={{ padding: '5rem', maxWidth: '80rem', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3.6rem', marginBottom: '2rem' }}>
        Entities Layer 테스트
      </h1>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>사용자 메시지</h2>
        <pre
          style={{
            background: '#f3f4f6',
            padding: '1.6rem',
            borderRadius: '0.8rem',
            overflow: 'auto',
            fontSize: '1.4rem',
          }}
        >
          {JSON.stringify(userMsg, null, 2)}
        </pre>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>AI 메시지 (완료)</h2>
        <pre
          style={{
            background: '#f3f4f6',
            padding: '1.6rem',
            borderRadius: '0.8rem',
            overflow: 'auto',
            fontSize: '1.4rem',
          }}
        >
          {JSON.stringify(completedMsg, null, 2)}
        </pre>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>출처 정보 포맷팅</h2>
        {mockSources.map((source) => (
          <div
            key={source.id}
            style={{
              marginTop: '1rem',
              padding: '1.6rem',
              background: '#eff6ff',
              borderRadius: '0.8rem',
              fontSize: '1.6rem',
            }}
          >
            <strong>{formatSourceTitle(source)}</strong>
            <br />
            유사도: {formatSimilarity(source.similarity)}
            <br />
            출처: {source.metadata?.source}
            <br />
            URL: <a href={source.metadata?.url}>{source.metadata?.url}</a>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
