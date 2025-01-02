import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: '/',
  css: {
    devSourcemap: true,
  },
}));
