import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // CRÍTICO: Permite que la app funcione en subdirectorios (ej: usuario.github.io/repo)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});