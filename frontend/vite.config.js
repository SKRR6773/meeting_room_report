import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { useStore } from 'vuex';



const store = useStore();
store.commit('setEnvMode', process.env.NODE_ENV);


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/socket.io': {
        target: 'http://localhost:8000',
        ws: true,
        secure: false
      },
      '/other_api': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/other_api/, '')
      }
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/good_com' : '/',
});
