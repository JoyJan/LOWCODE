import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/visual-maker/',
  plugins: [vue()],
  // server: { // ← ← ← ← ← ←
  //   host: '192.168.0.103' // ← 新增内容 ←
  //   } ,// ← ← ← ← ← ←
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  }
})
