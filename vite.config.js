import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Kino_Group_Project/' : '/',
  css: {
    devSourcemap: true,
  },
}));
