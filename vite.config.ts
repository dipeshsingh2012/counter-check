import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'counterCheck',
      filename: 'remoteEntry.js',
      exposes: {
        './CounterCheckWidget': './src/components/CounterCheckWidget.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
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
