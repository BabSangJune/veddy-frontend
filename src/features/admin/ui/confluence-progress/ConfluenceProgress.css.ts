import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '20px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  marginTop: '20px',
});

export const header = style({
  marginBottom: '20px',
});

export const title = style({
  margin: '0 0 8px 0',
  fontSize: '18px',
  fontWeight: 600,
  color: '#333',
});

export const subtitle = style({
  margin: '0',
  fontSize: '14px',
  color: '#666',
});

export const barContainer = style({
  marginBottom: '20px',
});

export const barBackground = style({
  width: '100%',
  height: '28px',
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden',
  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
});

export const barFill = style({
  height: '100%',
  background: 'linear-gradient(90deg, #4caf50, #45a049)',
  transition: 'width 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

export const barPercent = style({
  color: 'white',
  fontSize: '12px',
  fontWeight: 'bold',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
});

export const currentPageBox = style({
  padding: '12px',
  backgroundColor: '#e3f2fd',
  borderLeft: '4px solid #2196f3',
  borderRadius: '4px',
  marginBottom: '16px',
});

export const currentPageLabel = style({
  margin: '0 0 4px 0',
  fontSize: '12px',
  color: '#1976d2',
  fontWeight: 600,
});

export const currentPageTitle = style({
  margin: '0',
  fontSize: '14px',
  color: '#333',
  wordBreak: 'break-word',
});

export const statsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '12px',
  marginBottom: '16px',
});

export const statItem = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px',
  backgroundColor: 'white',
  border: '1px solid #e0e0e0',
  borderRadius: '6px',
});

export const statIcon = style({
  fontSize: '20px',
  marginBottom: '4px',
});

export const statLabel = style({
  fontSize: '12px',
  color: '#666',
  marginBottom: '4px',
});

export const statValue = style({
  fontSize: '16px',
  fontWeight: 600,
  color: '#333',
});

export const successBox = style({
  padding: '16px',
  backgroundColor: '#d4edda',
  border: '1px solid #c3e6cb',
  borderRadius: '6px',
  color: '#155724',
});

export const successTitle = style({
  margin: '0 0 8px 0',
  fontSize: '16px',
});

export const successText = style({
  margin: '4px 0',
  fontSize: '14px',
});

export const successBold = style({
  fontWeight: 600,
  color: '#0c5620',
});

export const errorBox = style({
  padding: '16px',
  backgroundColor: '#f8d7da',
  border: '1px solid #f5c6cb',
  borderRadius: '6px',
  color: '#721c24',
});

export const errorTitle = style({
  margin: '0 0 8px 0',
  fontSize: '16px',
});

export const errorText = style({
  margin: '0',
  fontSize: '14px',
});
