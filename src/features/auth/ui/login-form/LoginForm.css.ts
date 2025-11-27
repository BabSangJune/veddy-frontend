import { style } from '@vanilla-extract/css';
import { colors, fontSize } from '@/shared/config/styles/tokens.css';

export const container = style({
  backgroundColor: colors.neutral[0],
  padding: '40px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  textAlign: 'center',
  maxWidth: '400px',
  width: '100%',
  margin: '0 auto',
});

export const title = style({
  fontSize: '2.4rem',
  fontWeight: 600,
  marginBottom: '8px',
});

export const subtitle = style({
  fontSize: fontSize.base,
  color: colors.neutral[600],
  marginBottom: '8px',
});

export const description = style({
  fontSize: fontSize.sm,
  color: colors.neutral[500],
  marginBottom: '30px',
});

export const errorBox = style({
  backgroundColor: '#fee',
  color: '#c33',
  padding: '10px',
  borderRadius: '4px',
  marginBottom: '20px',
  fontSize: fontSize.sm,
});

export const loginButton = style({
  width: '100%',
  padding: '12px',
  backgroundColor: '#0078D4',
  color: colors.neutral[0],
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',

  ':hover': {
    backgroundColor: '#106ebe',
  },

  ':active': {
    backgroundColor: '#005a9e',
  },

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.7,
    backgroundColor: '#0078D4',
  },
});

export const footer = style({
  fontSize: fontSize.xs,
  color: colors.neutral[400],
  marginTop: '20px',
});
