// src/entities/message/model/helpers.ts
import type { Message, CreateMessageDto, SourceDocument } from './types';
// import type { Message, CreateMessageDto, MessageRole, SourceDocument } from './types';

/**
 * UUID v4 생성 (간단한 버전)
 */
export const generateMessageId = (): string => {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 메시지 생성 팩토리
 */
export const createMessage = (dto: CreateMessageDto): Message => {
    return {
        id: generateMessageId(),
        role: dto.role,
        content: dto.content,
        timestamp: new Date(),
        status: dto.role === 'assistant' ? 'streaming' : 'sent',
        sources: dto.sources,
    };
};

/**
 * 사용자 메시지 생성
 */
export const createUserMessage = (content: string): Message => {
    return createMessage({
        role: 'user',
        content,
    });
};

/**
 * AI 메시지 생성 (스트리밍 시작)
 */
export const createAssistantMessage = (content = ''): Message => {
    return createMessage({
        role: 'assistant',
        content,
    });
};

/**
 * 에러 메시지 생성
 */
export const createErrorMessage = (error: string): Message => {
    return {
        ...createMessage({
            role: 'assistant',
            content: `죄송합니다. 오류가 발생했습니다: ${error}`,
        }),
        status: 'error',
        error,
    };
};

/**
 * 메시지 상태 확인
 */
export const isMessageStreaming = (message: Message): boolean => {
    return message.status === 'streaming';
};

export const isMessageError = (message: Message): boolean => {
    return message.status === 'error';
};

export const isMessageSent = (message: Message): boolean => {
    return message.status === 'sent';
};

/**
 * 메시지 내용 업데이트 (스트리밍 중)
 */
export const updateMessageContent = (message: Message, additionalContent: string): Message => {
    return {
        ...message,
        content: message.content + additionalContent,
    };
};

/**
 * 메시지 완료 처리
 */
export const completeMessage = (
    message: Message,
    sources?: SourceDocument[],
): Message => {
    return {
        ...message,
        status: 'sent',
        sources: sources || message.sources,
    };
};

/**
 * 출처 문서 포맷팅 (UI 표시용)
 */
export const formatSourceTitle = (source: SourceDocument): string => {
    return `${source.title} (청크 #${source.chunkNumber})`;
};

export const formatSimilarity = (similarity: number): string => {
    return `${(similarity * 100).toFixed(1)}%`;
};
