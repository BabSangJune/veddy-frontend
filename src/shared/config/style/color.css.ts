// src/shared/styles/colors.css.ts
export const colors = {
  primary: '#4f46e5',
  secondary: '#10b981',
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
};

// src/shared/styles/spacing.css.ts
export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
} as const;

// src/shared/styles/typography.css.ts
import { style } from '@vanilla-extract/css';

export const headings = {
  h1: style({
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.2,
  }),
  h2: style({
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.3,
  }),
};

export const body = {
  base: style({
    fontSize: '1rem',
    lineHeight: 1.5,
  }),
  sm: style({
    fontSize: '0.875rem',
    lineHeight: 1.4,
  }),
};

// src/shared/styles/animations.css.ts
import { keyframes } from '@vanilla-extract/css';

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const slideUp = keyframes({
  from: { transform: 'translateY(10px)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
});

export const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
});
