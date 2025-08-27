import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// Dev proxy target (mirrors vue.config.js devServer.target)
const target = 'https://anastaciatolstonog.com'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    // No exclusions needed - all Vue 2 packages have been removed
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@modules': resolve(__dirname, 'modules'),
      'vue': 'vue/dist/vue.esm-bundler.js'
    },
    extensions: ['.js', '.vue', '.json', '.ts']
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    'process.env': {}
  },
  server: {
    port: 8083,
    host: true,
    open: '/exo_admin/',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target,
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: ''
      },
      '/redir': {
        target,
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: ''
      },
      '/utils': {
        target,
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: ''
      },
      '/media': {
        target,
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: ''
      }
    }
  },
  base: '/exo_admin/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/variables.scss";`
      }
    }
  }
})
