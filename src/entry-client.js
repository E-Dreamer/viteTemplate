/*
 * @Author: E-Dreamer
 * @Date: 2022-03-29 10:44:30
 * @LastEditTime: 2022-03-29 10:44:30
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { createApp } from './main'

const { app, router } = createApp()

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app')
})