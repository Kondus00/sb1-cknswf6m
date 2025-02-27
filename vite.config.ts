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
      '@staticcms/core': '@staticcms/core/static-cms-core.js', // Uaktualniony alias
    },
  },
  server: {
    fs: {
      strict: false,
    },
    hmr: {
      overlay: true,
    },
  },
});