import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7071/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/authApi' : {
        target : 'https://user-info-service.rook.love/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/authApi/, '')
      },
      '/fileApi' : {
        target : 'https://user-file-service.rook.love/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/fileApi/, '')
      },
    }
  },
  plugins: [
    react(),
    tailwindcss({
      
    })
  ]
})
