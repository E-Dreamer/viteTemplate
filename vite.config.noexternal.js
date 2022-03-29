/*
 * @Author: E-Dreamer
 * @Date: 2022-03-29 13:25:49
 * @LastEditTime: 2022-03-29 13:25:49
 * @LastEditors: E-Dreamer
 * @Description: 
 */
const config = require('./vite.config.js')
/**
 * @type {import('vite').UserConfig}
 */
module.exports = Object.assign(config, {
  ssr: {
    noExternal: /./
  },
  resolve: {
    // necessary because vue.ssrUtils is only exported on cjs modules
    alias: [
      {
        find: '@vue/runtime-dom',
        replacement: '@vue/runtime-dom/dist/runtime-dom.cjs.js'
      },
      {
        find: '@vue/runtime-core',
        replacement: '@vue/runtime-core/dist/runtime-core.cjs.js'
      }
    ]
  }
})