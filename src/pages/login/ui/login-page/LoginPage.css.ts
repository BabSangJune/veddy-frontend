import { style } from '@vanilla-extract/css';

import { colors } from '@/shared/config/styles/tokens.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: colors.neutral[100],
  padding: '20px',
});

export const errorMessage = style({
  color: '#c33',
  marginBottom: '20px',
  padding: '12px',
  backgroundColor: '#fee',
  borderRadius: '4px',
  textAlign: 'center',
  fontSize: '1.4rem',
});
