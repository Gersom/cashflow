import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "/"),
      '@src': path.resolve(__dirname, "./src"),

      '@assets': path.resolve(__dirname, "./src/assets"),
      '@images': path.resolve(__dirname, "./src/assets/images"),
      '@icons': path.resolve(__dirname, "./src/assets/icons"),

      '@components': path.resolve(__dirname, "./src/components"),

      '@layouts': path.resolve(__dirname, "./src/layouts"),

      '@pages': path.resolve(__dirname, "./src/pages"),
      '@app-page' : path.resolve(__dirname, "./src/pages/app"),

      '@stores': path.resolve(__dirname, "./src/stores"),

      '@utils' : path.resolve(__dirname, "./src/utils"),
    },
  },
})
