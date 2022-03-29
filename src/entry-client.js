/*
 * @Author: E-Dreamer
 * @Date: 2022-03-29 10:44:30
 * @LastEditTime: 2022-03-29 16:49:38
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { createApp } from './main'
// 链接：https://juejin.cn/post/6981734584568250376
const { app, router, store } = createApp()
// if(window.__INIT_STATE__) {
//   // 当使⽤ template 时， context.state 将作为 window.__INIT_STATE__ 状态⾃动嵌⼊到最终的 HTML
//   // 在客户端挂载到应⽤程序之前， store 就应该获取到状态：

//   store.replaceState(window.__INIT_STATE__._state.data)
// }

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app')
})