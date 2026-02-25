import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/aitu': {
        target: 'https://passport.test.supreme-team.tech',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aitu/, ''),
      }
    }
  }
})