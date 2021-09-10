/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 17:18:21
 * @LastEditTime: 2021-09-10 14:32:14
 * @LastEditors: E-Dreamer
 * @Description: 
 */

import store from '@/store'
import {
  computed,
  watch
} from 'vue'
import {
  useRoute
} from 'vue-router'
const WIDTH = 992

export default function () {
  const sidebar = computed(() => {
    return store.getters.sidebar
  })
  const device = computed(() => {
    return store.getters.device
  })

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
  // const route = useRoute();
  // const watchRouter = watch(
  //   () => route.path,
  //   (val, oval) => {
  //     if (device.value === 'mobile' && sidebar.value.opened) {
  //       store.dispatch("app/closeSideBar");
  //       store.dispatch('app/toggleAnimation', {
  //         withoutAnimation: true
  //       })
  //     }
  //   }
  // );

  const resizeMounted = () => {
    if (isMobile()) {
      store.dispatch("app/toggleDevice", "mobile");
      store.dispatch("app/closeSideBar");
      store.dispatch('app/toggleAnimation', {
        withoutAnimation: true
      })
    }
  }

  const resizeHandler = () => {
    // document.hidden 页面是否隐藏
    if (!document.hidden) {
      const flag = isMobile();
      store.dispatch("app/toggleDevice", flag ? "mobile" : "desktop");
      store.dispatch("app/closeSideBar");
      store.dispatch('app/toggleAnimation', {
        withoutAnimation: true
      })
    }
  }
  const addEventListenerOnResize = () => {
    window.addEventListener('resize', resizeHandler)
  }

  const removeEventListenerResize = () => {
    window.removeEventListener('resize', resizeHandler)
  }

  return {
    sidebar,
    device,
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize,
    // watchRouter
  }
}