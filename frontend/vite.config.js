import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: [
      '.trycloudflare.com',
      '.ngrok-free.dev'
    ],
    proxy: {
      '/api': 'http://localhost:3000'
    },
  },
  preview: {
    port: 4173,
    proxy: {
      '/api': 'http://localhost:3000'
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js'
  }
})