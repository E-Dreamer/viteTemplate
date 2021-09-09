/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 10:46:23
 * @LastEditTime: 2021-09-08 11:04:23
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { createRouter ,createWebHistory} from "vue-router";
import routes from './router'
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false }); // NProgress Configuration

import {getPageTitle} from '@/utils/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})


router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // 设置页面的title
  document.title = getPageTitle(to.meta.title);

  next();
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});


export default router;