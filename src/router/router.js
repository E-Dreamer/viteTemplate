/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 10:46:16
 * @LastEditTime: 2022-03-29 17:00:30
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import Layout from "@/layout/index.vue";
// import store from '@/store'
import {createStore} from '@/store'
const store = createStore()
const nofound = {
  path: "/:pathMatch(.*)",
  name: "NoFound",
  component: () => import("@/components/404/index.vue"),
};

const routes = [
  {
    name:'Layout',
    path:"/",
    component:Layout,
    redirect: "/home",
    children:[
    ]
  },
  nofound
]
store.getters.routes.forEach((item) => {
  routes[0].children.push(item);
});
export default routes