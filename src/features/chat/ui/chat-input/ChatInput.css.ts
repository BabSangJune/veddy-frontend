// src/features/chat/ui/ChatInput/ChatInput.css.ts
import { style } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#fff',
});

// 🆕 옵션 바 스타일
export const optionsBar = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingBottom: '8px',
});

export const toggleLabel = style({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '14px',
    color: '#6b7280',
    transition: 'color 0.2s',
    ':hover': {
        color: '#111827',
    },
});

export const checkbox = style({
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    accentColor: '#3b82f6',
});

export const toggleText = style({
    fontSize: '14px',
    fontWeight: 500,
});

// 🆕 입력 영역 래퍼
export const inputWrapper = style({
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-end',
});

export const textarea = style({
    flex: 1,
    padding: '12px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: '1.5',
    resize: 'none',
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
        borderColor: '#3b82f6',
    },
    ':disabled': {
        backgroundColor: '#f3f4f6',
        cursor: 'not-allowed',
    },
});

export const sendButton = style({
    padding: '12px 16px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
        backgroundColor: '#2563eb',
    },
    ':disabled': {
        backgroundColor: '#9ca3af',
        cursor: 'not-allowed',
    },
});
