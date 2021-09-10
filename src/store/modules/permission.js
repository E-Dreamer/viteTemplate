/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:24:23
 * @LastEditTime: 2021-09-10 13:57:06
 * @LastEditors: E-Dreamer
 * @Description: 
 */
/*
 * @Author: 陈诚
 * @Date: 2021-09-07 09:57:47
 * @LastEditTime: 2021-09-07 11:01:57
 * @LastEditors: 陈诚
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
