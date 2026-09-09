import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/v1/fitment': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/api/v1/products': {
        target: 'http://localhost:8001',
        changeOrigin: true,
      },
    },
  },
});

