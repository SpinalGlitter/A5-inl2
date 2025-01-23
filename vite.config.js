import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // Bas-URL för projektet
  build: {
    rollupOptions: {
      input: {
        kids: './kids.html',
        about: './about.html', // Du behöver inte längre ange flera HTML-ingångar
      },
    },
    outDir: 'dist', // Behåll utgångsmappen som 'dist'
    assetsDir: 'assets', // Alla resurser (JS, CSS,) lagras i 'dist/assets'
  },
  css: {
    devSourcemap: true, // Behåll sourcemaps för CSS under utveckling
  },
  server: {
    open: false, // Hindrar Vite från att automatiskt öppna en webbläsare
    port: 3000, // Port för utvecklingsservern om du vill testa statiska resurser separat
  },
});
