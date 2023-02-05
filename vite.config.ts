import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()]
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia']
    }),
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  base: './',
  server: {
    port: 3000,
    open: true,
    cors: true
  }
})
