import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Cookies from 'js-cookie'
import i18n from '@/locales'
// svg
import svgIcon from '@/components/svgIcon/index.vue'

// 样式
import "normalize.css/normalize.css";
import '@/styles/index.less'

import * as icons from  '@element-plus/icons'

// import "amfe-flexible/index.js";

let app = createApp(App);
app.component('svg-icon',svgIcon)

// icons组件 全部注册
for(let key in icons){
  app.component(key,icons[key])
}
app.config.globalProperties.$ELEMENT = ElementPlus
app.use(ElementPlus,{size: Cookies.get('size') || 'medium', })
.use(router)
.use(store)
.use(i18n)
.mount('#app')
