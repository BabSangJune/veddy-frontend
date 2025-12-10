// src/app/router/PrivateRoute.css.ts

import { style, keyframes } from '@vanilla-extract/css';

import { colors, spacing, fontSize, fontWeight } from '@/shared/config/styles';

const spinAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const loadingContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: colors.veddy.background,
  flexDirection: 'column',
  gap: spacing[16],
});

export const loadingText = style({
  fontSize: fontSize.base,
  fontWeight: fontWeight.medium,
  color: colors.neutral[600],
});

export const spinner = style({
  width: spacing[32],
  height: spacing[32],
  border: `3px solid ${colors.neutral[200]}`,
  borderTop: `3px solid ${colors.primary[500]}`,
  borderRadius: '50%',
  animation: `${spinAnimation} 1s linear infinite`, // ✨ keyframes 참조
});
