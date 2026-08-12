import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  // Ship root public/static assets inside client/dist for Vercel
  publicDir: path.resolve(__dirname, '../public'),
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://127.0.0.1:5000',
      '/resume': 'http://127.0.0.1:5000',
    },
  },
});
