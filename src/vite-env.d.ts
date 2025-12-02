/// <reference types="vite/client" />

// ============================================
// Vite 환경변수 타입
// ============================================
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SUPABASE_SERVICE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// ============================================
// Asset 타입 선언
// ============================================

// SVG 파일 (기본 import)
declare module '*.svg' {
  const content: string;
  export default content;
}

// SVG 파일 (React Component)
declare module '*.svg?react' {
  import React from 'react';
  const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVGComponent;
}

// 이미지 파일
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

export {};
