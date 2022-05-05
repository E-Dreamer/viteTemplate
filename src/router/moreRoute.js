/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 10:46:16
 * @LastEditTime: 2022-05-05 09:26:18
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import Layout from "@/layout/index.vue";
// import store from '@/store'
import {createStore} from '@/store'
import RouteView from '@/layout/components/AppMain.vue'

const store = createStore()
const nofound = {
  path: "/:pathMatch(.*)",
  name: "NoFound",
  component: () => import("@/components/404/index.vue"),
};

const routes = [
  // {
  //   name:'Layout',
  //   path:"/",
  //   component:Layout,
  //   redirect: "/home",
  //   children:[
  //   ]
  // },
  {
    path:'/',
    name:'index',
    component:Layout,
    redirect:'/portal',
    meta: { title: '首页' },
    children:[
      {
        path: '/system',
        name: 'systemIndex',
        component: RouteView,
        redirect: '/system/home',
        meta: { title: '系统首页', name: '管理系统', permission: 'cms' },
        children: []
      },
    ]
  },
  {
    path:"/portal",
    name:'首页',
    component:()=>import('@/views/portal.vue'),
  },
  nofound
]
store.getters.routes.forEach((item) => {
  // routes[0].children[0].push(item);
  item.path = '/system'+item.path
  routes[0].children[0].children.push(item)
});
export default routes