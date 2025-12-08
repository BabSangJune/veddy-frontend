# VEDDY Frontend Development Guidelines

## Project Overview
This is a React 19 + TypeScript + Vite frontend application using Feature-Sliced Design (FSD) architecture. The project includes streaming chat functionality with markdown rendering, source references, and real-time updates.

## Build & Development

### Key Technologies
- **Build Tool**: Vite (using rolldown-vite@7.2.9 override)
- **React**: 19.2.0
- **TypeScript**: 5.9.3 (strict mode enabled)
- **Styling**: Vanilla Extract (@vanilla-extract/css)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Backend Integration**: Supabase, Axios
- **Markdown Rendering**: react-markdown with remark-gfm (for table support)

### Build Configuration
- **Dev Server**: Runs on port 5173, host 0.0.0.0
- **API Proxy**: `/api` routes proxied to `VITE_API_BASE_URL` (default: http://localhost:8000)
- **Bundle Optimization**: Manual chunk splitting configured for:
  - `react-vendor` (React, ReactDOM, Scheduler)
  - `state-vendor` (TanStack Query, Zustand)
  - `style-vendor` (Vanilla Extract, clsx)
  - `utils-vendor` (Axios)
  - `vendor` (other node_modules)
- **Chunk Size Warning Limit**: 1000kb

### Environment Variables
Create `.env` file at project root with:
```
VITE_API_BASE_URL=http://localhost:8000
```

### Development Commands
```bash
npm run dev          # Start dev server (port 5173)
npm run build        # Type-check + build for production
npm run preview      # Preview production build locally
npm run type-check   # Run TypeScript compiler without emitting files
```

## Testing

### Testing Stack
- **Framework**: Vitest 4.0.15
- **Environment**: jsdom (for React component testing)
- **Testing Library**: @testing-library/react + @testing-library/jest-dom
- **Configuration**: vitest.config.ts

### Test Commands
```bash
npm test           # Run all tests once
npm run test:watch # Run tests in watch mode
npm run test:ui    # Run tests with Vitest UI
```

### Test File Location
- Place test files next to the code they test: `*.test.ts` or `*.test.tsx`
- Example: `src/shared/lib/utils/formatDate.ts` → `src/shared/lib/utils/formatDate.test.ts`

### Writing Tests
Tests use Vitest's API with `describe`, `it`, `expect`:

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from './myFunction';

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction(input);
    expect(result).toBe(expected);
  });
});
```

For React component tests, use `@testing-library/react`:

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Test Setup
Global test setup is configured in `src/test/setup.ts`, which imports `@testing-library/jest-dom` for additional matchers like `toBeInTheDocument()`.

## Architecture: Feature-Sliced Design (FSD)

### Layer Structure
The project follows strict FSD architecture with enforced boundaries:

```
src/
├── app/        # Application initialization, providers, global styles
├── pages/      # Route-level pages
├── widgets/    # Complex UI blocks (e.g., ChatWindow)
├── features/   # Business features (e.g., chat with streaming)
├── entities/   # Business entities (e.g., message)
└── shared/     # Shared utilities, configs, UI components
```

### Layer Import Rules (Enforced by ESLint)
Each layer can only import from layers below it:
- `app` → can import from `pages`, `widgets`, `features`, `entities`, `shared`
- `pages` → can import from `widgets`, `features`, `entities`, `shared`
- `widgets` → can import from `features`, `entities`, `shared`
- `features` → can import from `entities`, `shared`
- `entities` → can import from `shared`
- `shared` → can import from `shared` only

**Violations of these rules will cause ESLint errors.**

### Path Aliases
All imports use absolute paths with `@/` prefix:
```typescript
import { Message } from '@/entities/message';
import { useChatStream } from '@/features/chat/model/hooks/useChatStream';
import { Button } from '@/shared/ui/button';
```

## Code Style

### Formatting & Linting
```bash
npm run lint        # Check for linting issues
npm run lint:fix    # Auto-fix linting issues
npm run format      # Format all files with Prettier
npm run format:check # Check formatting without changing files
```

### Import Order (Enforced by ESLint)
Imports must follow this order with blank lines between groups:
1. External packages (React first)
2. Internal imports ordered by FSD layers: `@/app`, `@/pages`, `@/widgets`, `@/features`, `@/entities`, `@/shared`
3. Relative imports
4. Styles (e.g., `./Component.css`)

Example:
```typescript
import { memo } from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { Message } from '@/entities/message';
import { formatSourceTitle } from '@/entities/message';

import * as styles from './MessageItem.css';
```

### TypeScript Rules
- **Strict Mode**: Enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- **Unused Variables**: Prefix with `_` to ignore (e.g., `_unusedVar`)
- **Any Type**: Discouraged (warns on `any`)
- **Console**: Only `console.warn` and `console.error` allowed; `console.log` warns

### React Rules
- No need to import React in JSX files (React 19 automatic runtime)
- Use `memo()` for components that re-render frequently
- Follow React Hooks rules (enforced)
- Export components with `displayName` for debugging

### Vanilla Extract Styling
- Style files use `.css.ts` extension
- Import styles as: `import * as styles from './Component.css';`
- Use `className={styles.myClass}` syntax
- Colocate styles with components in same directory

### Comments
- The codebase includes Korean comments in many files
- Follow existing comment frequency and language when editing files
- Don't add comments unless they exist in surrounding code or user explicitly requests them

## Project-Specific Notes

### Streaming Chat Implementation
- Uses Server-Sent Events (SSE) for real-time message streaming
- Message status: `'pending'`, `'streaming'`, `'success'`, `'error'`
- Messages include optional `sources` array with metadata (similarity score, source URL, etc.)

### Markdown Rendering
- AI messages render as markdown using `react-markdown` with `remark-gfm` plugin
- User messages display as plain text
- Supports tables, code blocks, links, lists, blockquotes, etc.

### Bundle Analysis
- `rollup-plugin-visualizer` generates `dist/stats.html` after build
- Shows bundle composition, gzip sizes, and brotli sizes
- Opens automatically after build completes

## Common Development Tasks

### Adding a New Feature
1. Create feature directory under `src/features/`
2. Structure: `api/`, `model/`, `ui/` subdirectories
3. Ensure imports follow FSD rules (no upward imports)
4. Add tests in same directory as implementation

### Adding a New Entity
1. Create entity directory under `src/entities/`
2. Define TypeScript types/interfaces
3. Add utility functions for formatting/validation
4. Only import from `@/shared`

### Adding a Shared Component
1. Create component in `src/shared/ui/`
2. Create `.css.ts` file for styles using Vanilla Extract
3. Export from component file
4. Can be imported by any layer

### Debugging
- Use React Query DevTools (included in dev dependencies)
- Check network tab for API proxy requests to `/api`
- Verify environment variables are loaded: `import.meta.env.VITE_*`
- TypeScript errors: run `npm run type-check`
- Linting errors: run `npm run lint`

## Important Constraints

### Vite Override
Project uses `rolldown-vite@7.2.9` instead of standard Vite. This is configured in `package.json` overrides. Do not remove this override without testing thoroughly.

### React 19
Using React 19.2.0 which includes automatic JSX runtime and new hooks. Ensure dependencies are compatible.

### TypeScript Strict Mode
Strict mode is enabled. All code must pass strict type checking. Use proper types instead of `any` where possible.

### ESLint FSD Boundaries
The `eslint-plugin-boundaries` enforces FSD architecture rules. Violations will fail CI/CD. Always follow the layer import rules.
