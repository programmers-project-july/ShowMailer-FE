import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      // '/api'로 시작하는 요청을 백엔드 서버로 전달
      '/api': {
        target: 'https://demo-be-navy.vercel.app',
        changeOrigin: true, // CORS 에러 방지
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
