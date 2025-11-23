// src/features/chat/ui/ChatInput/ChatInput.tsx
import { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';
import * as styles from './ChatInput.css';

interface ChatInputProps {
    onSend: (message: string, tableMode: boolean) => void; // 🆕 tableMode 추가
    disabled?: boolean;
    placeholder?: string;
}

export const ChatInput = ({
                              onSend,
                              disabled = false,
                              placeholder = '메시지를 입력하세요...',
                          }: ChatInputProps) => {
    const [value, setValue] = useState('');
    const [tableMode, setTableMode] = useState(false); // 🆕 표 모드 상태
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);

        // 자동 높이 조절
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // Enter: 전송, Shift+Enter: 줄바꿈
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        const trimmedValue = value.trim();
        if (!trimmedValue || disabled) return;

        onSend(trimmedValue, tableMode); // 🆕 표 모드 전달
        setValue('');

        // 높이 초기화
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    return (
        <div className={styles.container}>
            {/* 🆕 표 모드 토글 */}
            <div className={styles.optionsBar}>
                <label className={styles.toggleLabel}>
                    <input
                        type="checkbox"
                        checked={tableMode}
                        onChange={(e) => setTableMode(e.target.checked)}
                        disabled={disabled}
                        className={styles.checkbox}
                    />
                    <span className={styles.toggleText}>
            📊 표 형식으로 정리
          </span>
                </label>
            </div>

            <div className={styles.inputWrapper}>
        <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
        />
                <button
                    className={styles.sendButton}
                    onClick={handleSend}
                    disabled={disabled || !value.trim()}
                    type="button"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
