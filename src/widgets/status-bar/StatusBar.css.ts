// src/widgets/status-bar/statusBar.css.ts
import { style, styleVariants } from '@vanilla-extract/css';
import { colors, spacing, fontSize } from '@/shared/config/styles';

export const container = style({
  padding: `${spacing[8]} ${spacing[20]}`,
  backgroundColor: colors.neutral[100],
  borderBottom: `0.1rem solid ${colors.neutral[200]}`,
});

export const content = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[8],
  maxWidth: '120rem',
  margin: '0 auto',
});

export const statusDot = styleVariants({
  success: {
    width: '0.8rem',
    height: '0.8rem',
    borderRadius: '50%',
    backgroundColor: colors.success,
  },
  warning: {
    width: '0.8rem',
    height: '0.8rem',
    borderRadius: '50%',
    backgroundColor: colors.warning,
  },
  error: {
    width: '0.8rem',
    height: '0.8rem',
    borderRadius: '50%',
    backgroundColor: colors.error,
  },
});

export const text = style({
  fontSize: fontSize.xs,
  color: colors.neutral[600],
});
