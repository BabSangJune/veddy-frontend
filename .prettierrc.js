// .prettierrc.js
export default {
  // 기본 규칙
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'all',
  printWidth: 100,
  endOfLine: 'auto',

  // JSX 규칙
  jsxSingleQuote: false,
  bracketSpacing: true,
  arrowParens: 'always',

  // 플러그인 추가
  plugins: ['prettier-plugin-css-order'],

  // CSS 속성 정렬 옵션
  cssDeclarationSorterOrder: 'concentric-css', // 또는 'alphabetical', 'smacss'
  cssDeclarationSorterKeepOverrides: true,

  // 파일별 설정
  overrides: [
    {
      files: '*.css.ts', // Vanilla Extract
      options: {
        parser: 'typescript',
        // CSS 속성 정렬 활성화
        cssDeclarationSorterOrder: 'concentric-css',
      },
    },
    {
      files: '*.css', // 일반 CSS
      options: {
        parser: 'css',
      },
    },
  ],
};
