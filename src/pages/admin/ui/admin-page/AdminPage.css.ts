// src/pages/admin/ui/admin-page/AdminPage.css.ts

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
  backgroundColor: colors.neutral[50],
  paddingTop: spacing[32],
  paddingBottom: spacing[32],
  paddingLeft: spacing[16],
  paddingRight: spacing[16],
});

export const header = style({
  marginBottom: spacing[32],
  background: colors.veddy.surface,
  borderRadius: borderRadius.lg,
  boxShadow: shadow.md,
  overflow: 'hidden',
});

export const headerContent = style({
  padding: spacing[32],
  textAlign: 'center',
});

export const title = style({
  fontSize: fontSize['3xl'],
  fontWeight: fontWeight.semibold,
  color: colors.neutral[900],
  margin: `0 0 ${spacing[8]} 0`,
});

export const subtitle = style({
  fontSize: fontSize.base,
  fontWeight: fontWeight.normal,
  color: colors.neutral[600],
  margin: 0,
});

export const main = style({
  maxWidth: '1000px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: spacing[32],
  '@media': {
    '(max-width: 768px)': {
      gap: spacing[20],
      paddingLeft: spacing[12],
      paddingRight: spacing[12],
    },
  },
});
