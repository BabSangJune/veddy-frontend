// src/entities/message/model/types.ts

/**
 * 메시지 역할
 */
export type MessageRole = 'user' | 'assistant' | 'system';

/**
 * 메시지 상태
 */
export type MessageStatus = 'sending' | 'sent' | 'error' | 'streaming';

/**
 * 문서 출처 정보
 * Supabase: document_chunks + documents JOIN 결과
 */
export interface SourceDocument {
    id: string; // document_chunks.id
    documentId: string; // document_chunks.document_id
    title: string; // documents.title
    content: string; // document_chunks.content (excerpt)
    chunkNumber: number; // document_chunks.chunk_number
    similarity: number; // pgvector 유사도 점수 (0-1)
    metadata?: {
        url?: string;
        source?: string; // "confluence", "notion" 등
        author?: string;
        updatedAt?: string;
    };
}

/**
 * 메시지 엔티티
 * Supabase: messages 테이블과 매핑
 */
export interface Message {
    id: string; // UUID
    role: MessageRole;
    content: string; // user_query 또는 ai_response
    timestamp: Date; // created_at
    status?: MessageStatus;
    sources?: SourceDocument[]; // source_chunk_ids 기반
    error?: string;
}

/**
 * 메시지 생성 DTO
 */
export interface CreateMessageDto {
    role: MessageRole;
    content: string;
    sources?: SourceDocument[];
}

/**
 * 백엔드 응답 타입 (SSE)
 */
export interface StreamTokenResponse {
    token?: string; // 스트리밍 토큰
    done?: boolean; // 완료 여부
    sources?: SourceDocument[]; // 완료 시 출처 정보
    error?: string;
}
