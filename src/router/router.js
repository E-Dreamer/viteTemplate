/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 10:46:16
 * @LastEditTime: 2021-09-08 15:33:52
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import Layout from "@/layout/index.vue";
import store from '@/store'
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