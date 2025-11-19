// src/features/chat/ui/MessageList/MessageList.css.ts
import { style } from '@vanilla-extract/css';
import { colors, spacing, fontSize } from '@/shared/config/styles';

export const container = style({
  flex: 1,
  overflowY: 'auto',
  padding: spacing[24],
  backgroundColor: colors.veddy.background,
});

export const messageList = style({
  display: 'flex',
  flexDirection: 'column',
});

export const empty = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  textAlign: 'center',
  color: colors.neutral[500],
});

export const emptyIcon = style({
  fontSize: '4.8rem',
  marginBottom: spacing[16],
});

export const emptyTitle = style({
  fontSize: fontSize['2xl'],
  fontWeight: 600,
  color: colors.neutral[700],
  marginBottom: spacing[8],
});

export const emptyDescription = style({
  fontSize: fontSize.base,
  color: colors.neutral[500],
});

export const loadingIndicator = style({
  textAlign: 'center',
  padding: spacing[16],
  fontSize: fontSize.sm,
  color: colors.neutral[500],
  fontStyle: 'italic',
});
