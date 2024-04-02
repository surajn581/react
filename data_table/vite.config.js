import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
     usePolling: true,
    },
    host: true, // Here
    strictPort: true,
    port: 8080, 
    cors: {origin:"*"},
    proxy: {
      '/api': {
        target: 'http://host.docker.internal:8000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  }
})
