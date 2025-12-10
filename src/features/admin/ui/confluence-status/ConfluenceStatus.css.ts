// src/features/admin/ui/confluence-status/ConfluenceStatus.css.ts

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

export const button = style({
  padding: `${spacing[10]} ${spacing[16]}`,
  backgroundColor: colors.success,
  color: colors.veddy.userText,
  border: 'none',
  borderRadius: borderRadius.base,
  fontSize: fontSize.sm,
  fontWeight: fontWeight.semibold,
  cursor: 'pointer',
  transition: `all ${transition.normal}`,
  width: '100%',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  ':hover': {
    backgroundColor: '#059669',
    boxShadow: shadow.lg,
  },
  ':disabled': {
    backgroundColor: colors.neutral[300],
    cursor: 'not-allowed',
  },
});

export const statusResult = style({
  marginTop: spacing[16],
});

export const statusSummary = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing[12],
  marginBottom: spacing[16],
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const statBox = style({
  background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[600]})`,
  color: colors.veddy.userText,
  padding: spacing[16],
  borderRadius: borderRadius.base,
  textAlign: 'center',
});

export const statBoxTitle = style({
  margin: `0 0 ${spacing[8]} 0`,
  fontSize: fontSize.sm,
  opacity: 0.9,
  fontWeight: fontWeight.medium,
});

export const statNumber = style({
  fontSize: fontSize['4xl'],
  fontWeight: fontWeight.bold,
  margin: 0,
});

export const spaceStats = style({
  marginTop: spacing[16],
  paddingTop: spacing[16],
  borderTop: `1px solid ${colors.neutral[200]}`,
});

export const spaceStatsTitle = style({
  margin: `0 0 ${spacing[12]} 0`,
  fontSize: fontSize.lg,
  color: colors.neutral[900],
  fontWeight: fontWeight.semibold,
});

export const spaceStatItem = style({
  padding: spacing[12],
  background: colors.neutral[50],
  borderRadius: borderRadius.base,
  marginBottom: spacing[10],
  borderLeft: `4px solid ${colors.primary[500]}`,
});

export const spaceStatItemTitle = style({
  margin: `0 0 ${spacing[6]} 0`,
  color: colors.primary[500],
  fontSize: fontSize.base,
  fontWeight: fontWeight.semibold,
});

export const spaceStatItemText = style({
  margin: `${spacing[2]} 0`,
  fontSize: fontSize.sm,
  color: colors.neutral[600],
});

export const docList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing[6],
  marginTop: spacing[8],
});

export const docTag = style({
  background: '#dbeafe',
  color: '#1d4ed8',
  padding: `${spacing[4]} ${spacing[8]}`,
  borderRadius: borderRadius.sm,
  fontSize: fontSize.xs,
  maxWidth: spacing[128],
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const docTagMore = style({
  background: colors.neutral[200],
  color: colors.neutral[600],
  padding: `${spacing[4]} ${spacing[8]}`,
  borderRadius: borderRadius.sm,
  fontSize: fontSize.xs,
  maxWidth: spacing[128],
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
