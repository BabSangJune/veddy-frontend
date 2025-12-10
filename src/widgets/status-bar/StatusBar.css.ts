import { style, styleVariants } from '@vanilla-extract/css';

import {
  colors,
  spacing,
  fontSize,
  borderRadius,
  fontWeight,
  transition,
} from '@/shared/config/styles';

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const content = style({
  width: '100%',
  maxWidth: '120rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: spacing[8],
});

export const statusSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[8],
  flex: 1,
});

export const statusDot = styleVariants({
  success: {
    width: '0.8rem',
    height: '0.8rem',
    borderRadius: '50%',
    backgroundColor: colors.success,
    flexShrink: 0,
  },
  warning: {
    width: '0.8rem',
    height: '0.8rem',
    borderRadius: '50%',
    backgroundColor: colors.warning,
    flexShrink: 0,
  },
  error: {
    width: '0.8rem',
    height: '0.8rem',
    borderRadius: '50%',
    backgroundColor: colors.error,
    flexShrink: 0,
  },
});

export const text = style({
  fontSize: fontSize.xs,
  color: colors.neutral[600],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const userSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[12],
  flexShrink: 0,
});

export const email = style({
  fontSize: fontSize.xs,
  color: colors.neutral[600],
  whiteSpace: 'nowrap',
});

export const logoutButton = style({
  padding: `${spacing[6]} ${spacing[12]}`,
  backgroundColor: colors.error,
  color: colors.neutral[0],
  border: 'none',
  borderRadius: '0.4rem',
  fontSize: fontSize.xs,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  whiteSpace: 'nowrap',

  ':hover': {
    opacity: 0.8,
  },

  ':active': {
    opacity: 0.7,
  },

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
});

export const wakeUpButton = style({
  padding: `${spacing[6]} ${spacing[12]}`,
  marginLeft: spacing[12],
  backgroundColor: colors.success,
  color: colors.neutral[0],
  border: 'none',
  borderRadius: '0.4rem',
  fontSize: fontSize.xs,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  whiteSpace: 'nowrap',

  ':hover': {
    opacity: 0.9,
    transform: 'scale(1.03)',
  },

  ':active': {
    opacity: 0.8,
    transform: 'scale(0.98)',
  },

  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
  },
});

export const adminButton = style({
  padding: `${spacing[8]} ${spacing[12]}`,
  backgroundColor: colors.primary[500],
  color: colors.veddy.userText,
  border: 'none',
  borderRadius: borderRadius.base,
  fontSize: fontSize.sm,
  fontWeight: fontWeight.semibold,
  cursor: 'pointer',
  transition: `all ${transition.normal}`,
  marginRight: spacing[12],
  ':hover': {
    backgroundColor: colors.primary[600],
  },
  ':active': {
    backgroundColor: colors.primary[700],
  },
});
