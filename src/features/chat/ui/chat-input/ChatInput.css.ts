// src/features/chat/ui/ChatInput/ChatInput.css.ts
import { style } from '@vanilla-extract/css';
import { colors, spacing, fontSize, borderRadius, transition } from '@/shared/config/styles';

export const container = style({
  display: 'flex',
  gap: spacing[12],
  padding: spacing[16],
  borderTop: `0.1rem solid ${colors.veddy.border}`,
  backgroundColor: colors.veddy.surface,
  alignItems: 'flex-end',
});

export const textarea = style({
  flex: 1,
  padding: spacing[12],
  fontSize: fontSize.base,
  fontFamily: 'inherit',
  lineHeight: 1.5,
  border: `0.1rem solid ${colors.veddy.inputBorder}`,
  borderRadius: borderRadius.base,
  resize: 'none',
  minHeight: '4.4rem',
  maxHeight: '20rem',
  color: colors.neutral[900],
  backgroundColor: colors.neutral[0],
  transition: `all ${transition.normal}`,

  selectors: {
    '&::placeholder': {
      color: colors.neutral[400],
    },
    '&:focus': {
      outline: 'none',
      borderColor: colors.veddy.inputFocus,
      boxShadow: `0 0 0 0.3rem ${colors.primary[100]}`,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: colors.neutral[50],
    },
  },
});

export const sendButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing[12],
  minWidth: '4.4rem',
  minHeight: '4.4rem',
  backgroundColor: colors.primary[500],
  color: colors.neutral[0],
  border: 'none',
  borderRadius: borderRadius.base,
  cursor: 'pointer',
  transition: `all ${transition.normal}`,

  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: colors.primary[600],
      transform: 'translateY(-0.2rem)',
    },
    '&:active:not(:disabled)': {
      backgroundColor: colors.primary[700],
      transform: 'translateY(0)',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    '&:focus-visible': {
      outline: `0.2rem solid ${colors.primary[500]}`,
      outlineOffset: '0.2rem',
    },
  },
});
