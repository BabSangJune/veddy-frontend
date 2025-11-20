// src/features/chat/ui/message-item/MessageItem.css.ts
import { style, keyframes } from '@vanilla-extract/css';
import { colors, spacing, fontSize, borderRadius } from '@/shared/config/styles';

const blink = keyframes({
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0 },
});

export const container = style({
    display: 'flex',
    gap: spacing[12],
    marginBottom: spacing[16],
});

export const avatar = style({
  width: '4.2rem',
  height: '4.2rem',
  borderRadius: borderRadius.full,
  backgroundColor: colors.primary[100],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  overflow: 'hidden', // 이미지가 경계를 넘지 않도록
});

// 이미지 스타일 추가
export const avatarImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover', // 비율 유지하며 컨테이너 꽉 채우기
});

export const userBubble = style({
    marginLeft: 'auto',
    maxWidth: '70%',
    padding: spacing[12],
    backgroundColor: colors.veddy.userBubble,
    color: colors.veddy.userText,
    borderRadius: borderRadius.md,
    borderBottomRightRadius: spacing[4],
});

export const assistantBubble = style({
    maxWidth: '70%',
    padding: spacing[12],
    backgroundColor: colors.veddy.assistantBubble,
    color: colors.veddy.assistantText,
    borderRadius: borderRadius.md,
    borderBottomLeftRadius: spacing[4],
});

// ✅ 기본 content 스타일
export const content = style({
    fontSize: fontSize.base,
    lineHeight: 1.6,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
});

// ===== ✅ 마크다운 요소별 스타일 =====

// 단락
export const paragraph = style({
    margin: 0,
    marginBottom: spacing[8],

    selectors: {
        '&:last-child': {
            marginBottom: 0,
        },
    },
});

// 제목들
export const heading1 = style({
    fontSize: '1.875rem',
    fontWeight: 700,
    margin: 0,
    marginBottom: spacing[12],
    color: colors.neutral[900],
});

export const heading2 = style({
    fontSize: '1.5rem',
    fontWeight: 700,
    margin: 0,
    marginBottom: spacing[10],
    marginTop: spacing[12],
    color: colors.neutral[900],
});

export const heading3 = style({
    fontSize: '1.25rem',
    fontWeight: 600,
    margin: 0,
    marginBottom: spacing[8],
    marginTop: spacing[10],
    color: colors.neutral[800],
});

// 강조 (Bold)
export const strong = style({
    fontWeight: 700,
    color: colors.primary[700],
});

// 이탤릭
export const em = style({
    fontStyle: 'italic',
    color: colors.neutral[700],
});

// 코드
export const inlineCode = style({
    padding: `${spacing[2]} ${spacing[4]}`,
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.sm,
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    color: colors.primary[700],
});

export const codeBlock = style({
    display: 'block',
    padding: spacing[12],
    backgroundColor: colors.neutral[900],
    borderRadius: borderRadius.md,
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    color: colors.neutral[100],
    overflow: 'auto',
    marginBottom: spacing[8],
});

// 링크
export const link = style({
    color: colors.primary[500],
    textDecoration: 'underline',
    wordBreak: 'break-all',

    selectors: {
        '&:hover': {
            color: colors.primary[700],
            opacity: 0.8,
        },
    },
});

// 리스트
export const list = style({
    paddingLeft: spacing[24],
    marginBottom: spacing[8],

    selectors: {
        '&:last-child': {
            marginBottom: 0,
        },
    },
});

export const orderedList = style({
    paddingLeft: spacing[24],
    marginBottom: spacing[8],

    selectors: {
        '&:last-child': {
            marginBottom: 0,
        },
    },
});

export const listItem = style({
    marginBottom: spacing[4],

    selectors: {
        '&:last-child': {
            marginBottom: 0,
        },
    },
});

// 구분선
export const divider = style({
    border: 'none',
    borderTop: `0.1rem solid ${colors.neutral[300]}`,
    margin: `${spacing[12]} 0`,
});

// 인용
export const blockquote = style({
    paddingLeft: spacing[12],
    borderLeftWidth: '0.4rem',
    borderLeftColor: colors.primary[500],
    borderLeftStyle: 'solid',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: spacing[8],
    color: colors.neutral[600],
    fontStyle: 'italic',
});

// ===== 기존 스타일 =====

export const cursor = style({
    animation: `${blink} 1s step-end infinite`,
    marginLeft: spacing[2],
});

export const timestamp = style({
    fontSize: fontSize.xs,
    color: colors.neutral[500],
    marginTop: spacing[8],
});

export const error = style({
    marginTop: spacing[8],
    padding: spacing[8],
    fontSize: fontSize.sm,
    color: colors.error,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: borderRadius.sm,
});

export const sources = style({
    marginTop: spacing[12],
    paddingTop: spacing[12],
    borderTop: `0.1rem solid ${colors.neutral[200]}`,
});

export const sourcesTitle = style({
    fontSize: fontSize.sm,
    fontWeight: 600,
    color: colors.neutral[700],
    marginBottom: spacing[8],
});

export const sourceItem = style({
    marginTop: spacing[8],
    padding: spacing[8],
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.sm,
    fontSize: fontSize.sm,
});

export const sourceTitle = style({
    fontWeight: 600,
    color: colors.neutral[800],
});

export const sourceMeta = style({
    fontSize: fontSize.xs,
    color: colors.neutral[600],
    marginTop: spacing[4],
});

export const sourceLink = style({
    display: 'inline-block',
    marginTop: spacing[4],
    fontSize: fontSize.xs,
    color: colors.primary[500],
    textDecoration: 'none',

    selectors: {
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});
