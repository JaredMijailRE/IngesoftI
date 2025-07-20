import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js']
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core'
      ],
      dts: false, // Disable DTS generation for now
      eslintrc: {
        enabled: false, // Disable ESLint config generation for now
      },
    }),
    Components({
      dts: false, // Disable DTS generation for now
      dirs: ['src/components'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: [
      'pg-hstore',
      'mysql2',
      'mariadb',
      'pg',
      'tedious',
      'oracledb',
      'ibm_db'
    ]
  },
  define: {
    global: 'globalThis',
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [
        'pg-hstore',
        'mysql2',
        'mariadb', 
        'pg',
        'tedious',
        'oracledb',
        'ibm_db'
      ],
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['@vueuse/core', 'axios'],
        },
      },
    },
  },
})
