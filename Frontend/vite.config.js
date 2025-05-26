import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/ClubRaqueta/Backend': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false
      }
    },
    cors: false
  }
})
