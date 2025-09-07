import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://user-intake-service.rook.love/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/authApi' : {
        target : 'https://user-info-service.rook.love/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/authApi/, '')
      }
    },
  },
  plugins: [
    react(),
    tailwindcss({
      
    })
  ],
})
