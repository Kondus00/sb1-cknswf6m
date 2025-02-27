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
          vendor: ['react', 'react-dom', 'react-router-dom', '@staticcms/core'],
        },
      },
    },
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@staticcms/core': '@staticcms/core/dist/index.js', // Alias dla Static CMS
    },
  },
  server: {
    fs: {
      strict: false, // Pozwala na elastyczne serwowanie plików
    },
    hmr: {
      overlay: true, // Włącz nakładkę błędów HMR
    },
  },
});