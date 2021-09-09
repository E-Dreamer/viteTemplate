/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 12:00:04
 * @LastEditTime: 2021-09-08 13:34:28
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import {
  createI18n
} from 'vue-i18n' //引入vue-i18n组件
import en from './en'
import zh from './zh-cn'
const messages = {
  'zh-cn':zh,
  'en':en,
};
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: sessionStorage.getItem('locale') || 'zh-cn', //默认显示的语言 
  messages,
})
export default i18n;