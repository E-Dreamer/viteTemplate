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

import directive from './directive'
// import "amfe-flexible/index.js";

// 自定义组件
import Toast from '@/components/Toast/index'
let app = createApp(App);
app.component('svg-icon',svgIcon)

app.config.globalProperties.$Toast = Toast;
// icons组件 全部注册
for(let key in icons){
  app.component(key,icons[key])
}
//自定义指令
Object.keys(directive).forEach(key=>{
  app.directive(key,directive[key])
})
app.config.globalProperties.$ELEMENT = ElementPlus
app.use(ElementPlus,{size: Cookies.get('size') || 'medium', })
.use(router)
.use(store)
.use(i18n)
.mount('#app')
