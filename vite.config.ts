import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://app.ticketmaster.com/discovery/v2',  // Your backend server URL
        changeOrigin: true,               // Changes the origin header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''),  // Optional: Strip '/api' from the path
      },
    },
  },  
})
