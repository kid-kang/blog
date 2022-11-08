import { fileURLToPath, URL } from 'node:url';
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    importToCDN({
      modules: [
        autoComplete('vue'),
        autoComplete('axios'),
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: "lib/index.iife.min.js",
        },
        {
          name: 'pinia',
          var: 'Pinia',
          path: 'dist/pinia.iife.min.js'
        },
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: 'https://unpkg.com/element-plus',
          css: 'https://unpkg.com/element-plus/dist/index.css'
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
