/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 10:51:39
 * @LastEditTime: 2022-03-30 16:34:22
 * @LastEditors: E-Dreamer
 * @Description:
 */
import all from '@/settings'
const { title } = all
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
  let r = /[\u4e00-\u9fa5]/
  return r.test(name)
}

// 执行注册store钩子
export const registerModules = (components, router, store) => {
  return components
    .filter((i) => typeof i.registerModule === 'function')
    .forEach((component) => {
      component.registerModule({ router: router.currentRoute, store })
    })
}

// 调用当前匹配到的组件里asyncData钩子，预取数据
export const prefetchData = (components, router, store) => {
  const asyncDatas = components.filter((i) => typeof i.asyncData === 'function')
  return Promise.all(
    asyncDatas.map((i) => {
      return i.asyncData({ router: router.currentRoute.value, store })
    })
  )
}

// ssr自定义钩子
export const getAsyncData = (router, store, isServer) => {
  return new Promise(async (resolve) => {
    const { matched } = router.currentRoute.value

    // 当前路由匹配到的组件
    const components = matched.map((i) => {
      return i.components.default
    })
    // 动态注册store
    registerModules(components, router, store)

    if (isServer) {
      // 预取数据
      await prefetchData(components, router, store)
    }

    resolve()
  })
}


// 组件中的数据预取逻辑， /src/page/Home.vue 服务端数据预取，
// export default {
//   asyncData({store}) {
//     return store.dispatch('getCount')
//   }
// })