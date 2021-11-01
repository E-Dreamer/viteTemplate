/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:24:23
 * @LastEditTime: 2021-11-01 09:30:45
 * @LastEditors: E-Dreamer
 * @Description: 
 */
const permission = {
  namespaced: true,
  state: {
    routes: [
      {
        parentName: "Layout",
        name: "home",
        path: "/home",
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: "menu.homepage",
          keepAlive: true,
          icon: "el-icon-menu",
          affix: true,
        },
      },
      {
        parentName: "Layout",
        name: "first",
        path: "/first",
        component: () => import('@/views/first/index.vue'),
        meta: {
          title: "第一项",
          icon: "el-icon-menu",
        },
      },
      {
        parentName:'Layout',
        name:"ceshi",
        path:'/ceshi',
        component:()=>import('@/views/ceshi/index.vue'),
        meta: {
          title: "测试",
          icon: "el-icon-menu",
        },
      }
    ],
  },
  mutations: {
    SET_ROUTE: (state, value) => {
      state.routes = value;
    },
  },
  actions: {
    setroute({commit},routes){
      commit('SET_ROUTE',routes)
    }
  },
};
export default permission;
