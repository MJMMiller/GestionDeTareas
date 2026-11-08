import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    strictPort: true,
  },
  test: {
    environment: 'jsdom',            // simula el navegador
    globals: true,                   // describe, it, expect disponibles sin importar
    setupFiles: './src/test/setup.js'
  }
})