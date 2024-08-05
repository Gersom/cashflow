import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "/"),
      '@src': path.resolve(__dirname, "./src"),
      '@assets': path.resolve(__dirname, "./src/assets"),
      '@images': path.resolve(__dirname, "./src/assets/images"),
      '@components': path.resolve(__dirname, "./src/components"),
      '@icons': path.resolve(__dirname, "./src/assets/icons"),
      '@layouts': path.resolve(__dirname, "./src/layouts"),
      '@pages': path.resolve(__dirname, "./src/pages"),
      '@stores': path.resolve(__dirname, "./src/stores"),
      '@utils' : path.resolve(__dirname, "./src/utils")
    },
  },
})
