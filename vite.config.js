import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import {
  svgBuilder
} from './plugins/svgBuiler'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgBuilder('./src/assets/svg/'),vueJsx()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "@v":path.resolve(__dirname,'src/views'),
      "@com": path.resolve(__dirname, 'src/components'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入 （不建议如此）
    // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  // css:{

  // },
  server: {
    host: '127.0.0,1', // 默认是 localhost
    port: '3000', // 默认是 3000 端口
    strictPort: false, // 若端口被占用直接退出 而不是尝试下一个可用端口
    open: true, // 浏览器自动打开
    https: false, // 是否开启 https
    ssr: false, // 服务端渲染
    base: './', // 生产环境下的公共路径
    outDir: 'dist', // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      '/api': {
        target: 'http://127.0.0.1:7001', // 后端服务实际地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
  }

})