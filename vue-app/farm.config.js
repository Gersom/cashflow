import { defineConfig } from '@farmfe/core';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  compilation: {
    resolve: {
      alias: {
        '@': path.join(process.cwd(), "/"),
        '@src': path.join(process.cwd(), "src"),
        '@assets': path.join(process.cwd(), "src/assets"),
        '@images': path.join(process.cwd(), "src/assets/images"),
        '@components': path.join(process.cwd(), "src/components"),
        '@layouts': path.join(process.cwd(), "src/layouts"),
        '@pages': path.join(process.cwd(), "src/pages"),
        '@stores': path.join(process.cwd(), "src/stores"),
      },
    },
  },
  vitePlugins: [vue()],
});
