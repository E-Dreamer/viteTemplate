/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 10:51:39
 * @LastEditTime: 2021-09-09 15:01:25
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import all from '@/settings'
const {
  title
} = all
import i18n from '@/locales'

export function getPageTitle(pageTitle) {
  if (pageTitle) {
    if (!reg(pageTitle)) {
      return `${i18n.global.t(pageTitle)} - ${title}`
    } else {
      return `${pageTitle}-${title}`
    }
  }
  return `${title}`
}

export function reg(name) {
  let r = /[\u4e00-\u9fa5]/;
  return r.test(name)
}