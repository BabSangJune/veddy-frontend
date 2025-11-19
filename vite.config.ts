import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html', // 빌드 후 stats.html 생성
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/app': path.resolve(__dirname, './src/app'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/widgets': path.resolve(__dirname, './src/widgets'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/entities': path.resolve(__dirname, './src/entities'),
      '@/shared': path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://192.168.10.60:8000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 1. React 생태계
          if (id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/scheduler')) {
            return 'react-vendor';
          }

          // 2. 상태 관리
          if (id.includes('node_modules/@tanstack/react-query') ||
            id.includes('node_modules/zustand')) {
            return 'state-vendor';
          }

          // 3. 스타일링
          if (id.includes('node_modules/@vanilla-extract') ||
            id.includes('node_modules/clsx')) {
            return 'style-vendor';
          }

          // 4. 유틸리티
          if (id.includes('node_modules/axios')) {
            return 'utils-vendor';
          }

          // 5. 나머지 node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },

        // 파일명 패턴
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // 청크 크기 경고 조정
    chunkSizeWarningLimit: 1000, // 1MB
  },
});





