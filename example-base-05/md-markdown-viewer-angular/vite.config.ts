import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5175,
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  optimizeDeps: {
    include: ['@angular/common', '@angular/core', '@angular/platform-browser']
  },
  build: {
    target: 'es2020',
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});

