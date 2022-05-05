// 基本的
// import { createApp } from 'vue'
// SSR
import { createSSRApp } from 'vue'
import App from './App.vue'
// import router from '@/router'
// import store from '@/store'
//SSR
import { createRouter } from '@/router'
import { createStore } from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Cookies from 'js-cookie'
import i18n from '@/locales'
// svg
import svgIcon from '@/components/svgIcon/index.vue'

// 样式
import 'normalize.css/normalize.css'
import '@/styles/index.less'

import * as icons from '@element-plus/icons'

import directive from './directive'
// import "amfe-flexible/index.js";

// 自定义组件
import Toast from '@/components/Toast/index'
import MesBox from '@/components/MesBox/index'

// 基本
// let app = createApp(App);
// app.component('svg-icon',svgIcon)

// app.config.globalProperties.$Toast = Toast;
// // app.config.globalProperties.$MesBox = MesBox;
// app.provide('$MesBox',MesBox)

// // icons组件 全部注册
// for(let key in icons){
//   app.component(key,icons[key])
// }
// //自定义指令
// Object.keys(directive).forEach(key=>{
//   app.directive(key,directive[key])
// })
// app.config.globalProperties.$ELEMENT = ElementPlus
// app.use(ElementPlus,{size: Cookies.get('size') || 'medium', })
// .use(router)
// .use(store)
// .use(i18n)
// .mount('#app')

//ssr
export function createApp() {
  let app = createSSRApp(App)

  const router = createRouter()
  const store = createStore()

  app.component('svg-icon', svgIcon)

  app.config.globalProperties.$Toast = Toast
  // app.config.globalProperties.$MesBox = MesBox;
  app.provide('$MesBox', MesBox)

  // icons组件 全部注册
  for (let key in icons) {
    app.component(key, icons[key])
  }
  //自定义指令
  Object.keys(directive).forEach((key) => {
    app.directive(key, directive[key])
  })
  app.config.globalProperties.$ELEMENT = ElementPlus
  app
    .use(ElementPlus, { size: Cookies.get('size') || 'medium' })
    .use(router)
    .use(store)
    .use(i18n)
    .mount('#app')

  return { app, router, store }
}