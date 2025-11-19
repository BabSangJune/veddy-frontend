// src/features/chat/ui/MessageItem/MessageItem.css.ts
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
  width: '3.6rem',
  height: '3.6rem',
  borderRadius: borderRadius.full,
  backgroundColor: colors.primary[100],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const avatarText = style({
  fontSize: fontSize.sm,
  fontWeight: 600,
  color: colors.primary[700],
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

export const content = style({
  fontSize: fontSize.base,
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});

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
