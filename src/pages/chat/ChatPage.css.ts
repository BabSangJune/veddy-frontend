// src/pages/chat/ChatPage.css.ts
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
});

export const main = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const chatContainer = style({
  width: '100%',
  maxWidth: '120rem',
  display: 'flex',
  flexDirection: 'column',
});
