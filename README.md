# VEDDY Frontend

React 19 + TypeScript + Vite 기반의 프론트엔드 애플리케이션입니다. Feature-Sliced Design (FSD) 아키텍처를 사용하여 구축되었으며, 스트리밍 채팅 기능과 마크다운 렌더링, 소스 참조, 실시간 업데이트를 제공합니다.

## 📋 목차

- [기술 스택](#-기술-스택)
- [요구사항](#-요구사항)
- [설치 및 실행](#-설치-및-실행)
- [사용 가능한 스크립트](#-사용-가능한-스크립트)
- [환경 변수](#-환경-변수)
- [테스트](#-테스트)
- [프로젝트 구조](#-프로젝트-구조)
- [빌드 최적화](#-빌드-최적화)
- [코드 스타일](#-코드-스타일)
- [라이선스](#-라이선스)

## 🛠 기술 스택

### 핵심 기술
- **빌드 도구**: Vite 7.2.9 (rolldown-vite 오버라이드 사용)
- **프레임워크**: React 19.2.0
- **언어**: TypeScript 5.9.3 (strict mode 활성화)
- **스타일링**: Vanilla Extract (@vanilla-extract/css)
- **상태 관리**: Zustand
- **데이터 페칭**: TanStack Query (React Query)
- **라우팅**: React Router DOM 7.9.6
- **백엔드 연동**: Supabase, Axios
- **마크다운 렌더링**: react-markdown + remark-gfm (테이블 지원)

### UI 컴포넌트
- Radix UI (Dialog, Scroll Area, Slot)

### 개발 도구
- **테스트**: Vitest 4.0.15 + Testing Library
- **린팅**: ESLint + TypeScript ESLint + eslint-plugin-boundaries (FSD 강제)
- **포매팅**: Prettier
- **번들 분석**: rollup-plugin-visualizer

## ✅ 요구사항

- **Node.js**: 18.x 이상 권장
- **패키지 매니저**: npm

## 🚀 설치 및 실행

### 1. 저장소 클론 및 의존성 설치

```bash
# 저장소 클론
git clone <repository-url>
cd veddy-frontend

# 의존성 설치
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_KEY=your_supabase_service_key
```

> **참고**: `.env` 파일은 Git에 커밋되지 않습니다. 실제 값은 팀 내부에서 공유받으세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 4. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성되며, `dist/stats.html`에서 번들 분석 결과를 확인할 수 있습니다.

### 5. 프로덕션 빌드 미리보기

```bash
npm run preview
```

## 📜 사용 가능한 스크립트

| 스크립트 | 설명 |
|---------|------|
| `npm run dev` | 개발 서버 시작 (포트 5173) |
| `npm run build` | TypeScript 타입 체크 + 프로덕션 빌드 |
| `npm run preview` | 프로덕션 빌드 로컬 미리보기 |
| `npm run type-check` | TypeScript 타입 체크만 실행 (파일 생성 없음) |
| `npm run lint` | ESLint로 코드 검사 |
| `npm run lint:fix` | ESLint로 코드 검사 및 자동 수정 |
| `npm run format` | Prettier로 코드 포매팅 |
| `npm run format:check` | Prettier 포매팅 검사 (변경 없음) |
| `npm test` | 모든 테스트 1회 실행 |
| `npm run test:watch` | 테스트 워치 모드 실행 |
| `npm run test:ui` | Vitest UI로 테스트 실행 |

## 🔐 환경 변수

프로젝트에서 사용하는 환경 변수 목록:

| 변수명 | 필수 | 설명 | 기본값 |
|-------|------|------|--------|
| `VITE_API_BASE_URL` | ✅ | 백엔드 API 기본 URL | `http://localhost:8000` |
| `VITE_SUPABASE_URL` | ✅ | Supabase 프로젝트 URL | - |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Supabase 익명 키 | - |
| `VITE_SUPABASE_SERVICE_KEY` | ⚠️ | Supabase 서비스 역할 키 (서버 전용) | - |

### API 프록시 설정

개발 서버에서 `/api` 경로로 시작하는 요청은 자동으로 `VITE_API_BASE_URL`로 프록시됩니다.

예: `http://localhost:5173/api/chat` → `http://localhost:8000/api/chat`

## 🧪 테스트

### 테스트 환경

- **프레임워크**: Vitest 4.0.15
- **환경**: jsdom (React 컴포넌트 테스트용)
- **Testing Library**: @testing-library/react + @testing-library/jest-dom
- **설정 파일**: `vitest.config.ts`

### 테스트 실행

```bash
# 모든 테스트 1회 실행
npm test

# 워치 모드로 테스트 실행 (파일 변경 시 자동 재실행)
npm run test:watch

# Vitest UI로 테스트 실행
npm run test:ui
```

### 테스트 파일 작성 규칙

- 테스트 파일은 테스트하려는 코드와 같은 디렉토리에 배치
- 파일명: `*.test.ts` 또는 `*.test.tsx`
- 예: `src/shared/lib/utils/formatDate.ts` → `src/shared/lib/utils/formatDate.test.ts`

### 테스트 예시

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## 📁 프로젝트 구조

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 따릅니다.

```
veddy-frontend/
├── src/
│   ├── app/                # 애플리케이션 초기화, 프로바이더, 전역 스타일
│   ├── pages/              # 라우트 레벨 페이지
│   ├── widgets/            # 복잡한 UI 블록 (예: ChatWindow)
│   ├── features/           # 비즈니스 기능 (예: 스트리밍 채팅)
│   ├── entities/           # 비즈니스 엔티티 (예: message)
│   ├── shared/             # 공유 유틸리티, 설정, UI 컴포넌트
│   └── assets/             # 정적 파일 (이미지, 폰트 등)
├── public/                 # 공개 정적 파일
├── dist/                   # 프로덕션 빌드 결과물
├── index.html              # HTML 엔트리 포인트
├── vite.config.ts          # Vite 설정
├── tsconfig.json           # TypeScript 설정
├── eslint.config.js        # ESLint 설정
├── vitest.config.ts        # Vitest 설정
├── vercel.json             # Vercel 배포 설정
└── package.json            # 프로젝트 메타데이터 및 의존성
```

### FSD 계층 임포트 규칙 (ESLint로 강제)

각 계층은 자신보다 하위 계층에서만 임포트할 수 있습니다:

- `app` → `pages`, `widgets`, `features`, `entities`, `shared`
- `pages` → `widgets`, `features`, `entities`, `shared`
- `widgets` → `features`, `entities`, `shared`
- `features` → `entities`, `shared`
- `entities` → `shared`
- `shared` → `shared` 만 가능

**이 규칙을 위반하면 ESLint 에러가 발생합니다.**

### 경로 별칭

모든 임포트는 `@/` 접두사를 사용한 절대 경로를 사용합니다:

```typescript
import { Message } from '@/entities/message';
import { useChatStream } from '@/features/chat/model/hooks/useChatStream';
import { Button } from '@/shared/ui/button';
```

## 🎨 빌드 최적화

### 청크 분할 전략

프로덕션 빌드 시 다음과 같이 수동으로 청크를 분할합니다:

- `react-vendor`: React, ReactDOM, Scheduler
- `state-vendor`: TanStack Query, Zustand
- `style-vendor`: Vanilla Extract, clsx
- `utils-vendor`: Axios
- `vendor`: 기타 node_modules

### 번들 분석

빌드 후 `dist/stats.html`에서 번들 구성, gzip/brotli 크기를 시각적으로 확인할 수 있습니다.

```bash
npm run build
# 빌드 완료 후 dist/stats.html이 자동으로 열립니다
```

### 청크 크기 경고 제한

1000KB 이상의 청크에 대해 경고가 표시됩니다.

## 💅 코드 스타일

### 린팅 및 포매팅

```bash
# 코드 검사
npm run lint

# 자동 수정
npm run lint:fix

# 포매팅
npm run format

# 포매팅 검사
npm run format:check
```

### 임포트 순서 (ESLint로 강제)

임포트는 다음 순서로 작성하며, 그룹 간 빈 줄을 추가합니다:

1. 외부 패키지 (React 우선)
2. FSD 계층별 내부 임포트: `@/app`, `@/pages`, `@/widgets`, `@/features`, `@/entities`, `@/shared`
3. 상대 경로 임포트
4. 스타일 임포트 (예: `./Component.css`)

### TypeScript 규칙

- **Strict Mode**: 활성화 (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)
- **미사용 변수**: `_` 접두사로 무시 (예: `_unusedVar`)
- **Any 타입**: 사용 지양 (경고 발생)
- **Console**: `console.warn`, `console.error`만 허용; `console.log`는 경고

### Vanilla Extract 스타일링

- 스타일 파일은 `.css.ts` 확장자 사용
- 임포트: `import * as styles from './Component.css';`
- 사용: `className={styles.myClass}`
- 컴포넌트와 같은 디렉토리에 배치
- shared / config / styles 내 토큰 참고

### 주석

- 코드베이스에는 한국어 주석이 많이 포함되어 있습니다
- 파일을 수정할 때는 기존 주석의 빈도와 언어를 따르세요
- 주변 코드에 주석이 없거나 사용자가 명시적으로 요청하지 않는 한 주석을 추가하지 마세요

## 🔧 주요 기능

### 스트리밍 채팅

- Server-Sent Events (SSE)를 사용한 실시간 메시지 스트리밍
- 메시지 상태: `'pending'`, `'streaming'`, `'success'`, `'error'`
- 메시지에 선택적 `sources` 배열 포함 (유사도 점수, 소스 URL 등)

### 마크다운 렌더링

- AI 메시지는 `react-markdown` + `remark-gfm` 플러그인으로 렌더링
- 사용자 메시지는 일반 텍스트로 표시
- 테이블, 코드 블록, 링크, 목록, 인용구 등 지원

## 📄 라이선스

<!-- TODO: 라이선스 파일 추가 필요 -->

이 프로젝트의 라이선스는 아직 명시되지 않았습니다.

---

**개발 문의**: [문의처 추가 필요]
