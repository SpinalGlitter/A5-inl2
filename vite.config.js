import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/Kino_Group_Project/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        kids: './kids.html',
        about: './about.html',
      },
    },
  },
  css: {
    devSourcemap: true,
  },
}));
