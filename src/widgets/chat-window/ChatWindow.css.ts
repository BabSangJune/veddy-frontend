// src/widgets/chat-window/chatWindow.css.ts
import { style } from '@vanilla-extract/css';

import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  shadow,
} from '@/shared/config/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: colors.veddy.background,
});

export const header = style({
  backgroundColor: colors.veddy.surface,
  borderBottom: `0.1rem solid ${colors.veddy.border}`,
  boxShadow: shadow.sm,
});

export const headerContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: spacing[20],
  maxWidth: '120rem',
  margin: '0 auto',
});

export const headerTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[12],
});

export const avatarIcon = style({
  width: '6.8rem',
  height: '6.8rem',
  fontSize: '2.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.primary[100],
  // borderRadius: borderRadius.full,
});

export const title = style({
  fontSize: fontSize['2xl'],
  fontWeight: fontWeight.bold,
  color: colors.neutral[900],
  margin: 0,
});

export const subtitle = style({
  fontSize: fontSize.sm,
  color: colors.neutral[500],
  margin: `${spacing[4]} 0 0 0`,
});

export const clearButton = style({
  padding: `${spacing[8]} ${spacing[16]}`,
  fontSize: fontSize.sm,
  fontWeight: fontWeight.medium,
  color: colors.neutral[700],
  backgroundColor: 'transparent',
  border: `0.1rem solid ${colors.neutral[300]}`,
  borderRadius: borderRadius.base,
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: colors.neutral[100],
      borderColor: colors.neutral[400],
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const errorBanner = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[12],
  padding: spacing[12],
  backgroundColor: 'rgba(239, 68, 68, 0.1)',
  borderBottom: `0.1rem solid ${colors.error}`,
  color: colors.error,
});

export const errorIcon = style({
  fontSize: fontSize.xl,
});

export const errorText = style({
  fontSize: fontSize.sm,
  fontWeight: fontWeight.medium,
});
