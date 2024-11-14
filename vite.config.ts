import { fileURLToPath, URL } from 'node:url'

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_URL,
  clearScreen: false,
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({ sassVariables: '@/variables.sass' }),
  ],
  build: {
    target: 'ES2022',
    outDir: 'dist-demo',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./demo', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
      sass: { api: 'modern-compiler' },
    },
  },
})
