// src/features/admin/ui/confluence-load-form/ConfluenceLoadForm.css.ts

import { style } from '@vanilla-extract/css';

import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  shadow,
  transition,
} from '@/shared/config/styles';

export const section = style({
  background: colors.veddy.surface,
  padding: spacing[24],
  borderRadius: borderRadius.lg,
  boxShadow: shadow.md,
  marginBottom: spacing[24],
});

export const title = style({
  fontSize: fontSize['2xl'],
  color: colors.neutral[900],
  margin: `0 0 ${spacing[16]} 0`,
  display: 'flex',
  alignItems: 'center',
  gap: spacing[10],
  fontWeight: fontWeight.semibold,
});

export const formGroup = style({
  marginBottom: spacing[16],
  display: 'flex',
  flexDirection: 'column',
});

export const label = style({
  fontWeight: fontWeight.semibold,
  color: colors.neutral[900],
  marginBottom: spacing[6],
  fontSize: fontSize.sm,
});

export const input = style({
  padding: `${spacing[10]} ${spacing[12]}`,
  border: `2px solid ${colors.neutral[300]}`,
  borderRadius: borderRadius.base,
  fontSize: fontSize.sm,
  transition: `all ${transition.fast}`,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[500],
    boxShadow: `0 0 0 3px ${colors.primary[500]}20`,
  },
  ':disabled': {
    backgroundColor: colors.neutral[100],
    cursor: 'not-allowed',
    color: colors.neutral[400],
  },
});

export const helpText = style({
  fontSize: fontSize.xs,
  color: colors.neutral[500],
  marginTop: spacing[2],
});

export const helpLink = style({
  color: colors.primary[500],
  textDecoration: 'none',
  fontWeight: fontWeight.medium,
  ':hover': {
    textDecoration: 'underline',
  },
});

export const buttonGroup = style({
  display: 'flex',
  gap: spacing[12],
  marginTop: spacing[24],
  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
    },
  },
});

export const button = style({
  padding: `${spacing[10]} ${spacing[16]}`,
  border: 'none',
  borderRadius: borderRadius.base,
  fontSize: fontSize.sm,
  fontWeight: fontWeight.semibold,
  cursor: 'pointer',
  transition: `all ${transition.normal}`,
  flex: 1,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
});

export const buttonPrimary = style({
  padding: `${spacing[10]} ${spacing[16]}`,
  border: 'none',
  borderRadius: borderRadius.base,
  fontSize: fontSize.sm,
  fontWeight: fontWeight.semibold,
  cursor: 'pointer',
  transition: `all ${transition.normal}`,
  flex: 1,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  backgroundColor: colors.primary[500],
  color: colors.veddy.userText,
  ':hover': {
    backgroundColor: colors.primary[600],
    boxShadow: shadow.lg,
  },
  ':disabled': {
    backgroundColor: colors.neutral[300],
    cursor: 'not-allowed',
  },
});

export const buttonSecondary = style({
  padding: `${spacing[10]} ${spacing[16]}`,
  border: 'none',
  borderRadius: borderRadius.base,
  fontSize: fontSize.sm,
  fontWeight: fontWeight.semibold,
  cursor: 'pointer',
  transition: `all ${transition.normal}`,
  flex: 1,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  backgroundColor: colors.neutral[200],
  color: colors.neutral[900],
  ':hover': {
    backgroundColor: colors.neutral[300],
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const alert = style({
  padding: `${spacing[12]} ${spacing[16]}`,
  borderRadius: borderRadius.base,
  marginTop: spacing[16],
});

export const alertError = style({
  padding: `${spacing[12]} ${spacing[16]}`,
  borderRadius: borderRadius.base,
  marginTop: spacing[16],
  backgroundColor: '#fee2e2',
  borderLeft: `4px solid ${colors.error}`,
  color: '#991b1b',
});

export const alertSuccess = style({
  padding: `${spacing[12]} ${spacing[16]}`,
  borderRadius: borderRadius.base,
  marginTop: spacing[16],
  backgroundColor: '#dcfce7',
  borderLeft: `4px solid ${colors.success}`,
  color: colors.neutral[900],
});

export const alertTitle = style({
  margin: `0 0 ${spacing[8]} 0`,
  fontSize: fontSize.base,
  fontWeight: fontWeight.semibold,
});

export const alertList = style({
  margin: 0,
  paddingLeft: spacing[16],
  listStyle: 'none',
});

export const alertListItem = style({
  padding: `${spacing[4]} 0`,
  fontSize: fontSize.sm,
});

export const alertListItemStrong = style({
  color: colors.neutral[900],
  fontWeight: fontWeight.semibold,
});
