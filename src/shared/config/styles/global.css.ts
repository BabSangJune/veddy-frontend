// src/shared/styles/global.css.ts
import { globalStyle } from '@vanilla-extract/css';
import { colors, fontSize } from './tokens.css';

// 1rem = 10px 설정
globalStyle('html', {
    fontSize: '62.5%', // 16px * 0.625 = 10px
    boxSizing: 'border-box',
});

globalStyle('*, *::before, *::after', {
    boxSizing: 'inherit',
});

globalStyle('body', {
    margin: 0,
    padding: 0,
    fontSize: fontSize.base, // 1.6rem (16px)
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    lineHeight: 1.5,
    color: colors.neutral[900],
    backgroundColor: colors.veddy.background,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
});

globalStyle('h1, h2, h3, h4, h5, h6', {
    margin: 0,
    fontWeight: 600,
});

globalStyle('p', {
    margin: 0,
});

globalStyle('button', {
    fontFamily: 'inherit',
});

globalStyle('input, textarea, select', {
    fontFamily: 'inherit',
    fontSize: 'inherit',
});

// 스크롤바 스타일링 (선택)
globalStyle('::-webkit-scrollbar', {
    width: '0.8rem',
    height: '0.8rem',
});

globalStyle('::-webkit-scrollbar-track', {
    backgroundColor: colors.neutral[100],
});

globalStyle('::-webkit-scrollbar-thumb', {
    backgroundColor: colors.neutral[300],
    borderRadius: '0.4rem',
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
    backgroundColor: colors.neutral[400],
});
