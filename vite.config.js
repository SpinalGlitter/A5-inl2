import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: mode === 'development' ? '/' : '/Kino_Group_Project/',
  css: {
    devSourcemap: true,
  },
}));
