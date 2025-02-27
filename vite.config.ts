import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  publicDir: 'public',
  resolve: {
    alias: {
      'decap-cms': 'decap-cms/dist/decap-cms.js',
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});