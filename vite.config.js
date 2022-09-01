import { fileURLToPath, URL } from 'node:url'
import WindiCSS from 'vite-plugin-windicss'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
  vue(),
  WindiCSS({
    scan: {
      dirs: ['./src'],
      exclude: ['**/examples/**/*', '/node_modules/'],
      fileExtensions: ['vue', 'ts', 'md'],
    },
  }),
  ],
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    base:"./"
  },
  build: {
  
    chunkSizeWarningLimit: 100000,
    rollupOptions: {
      output: {
        manualChunks: {
          chromatone: ['use-chromatone']
        },
      },
    },
  },
})
