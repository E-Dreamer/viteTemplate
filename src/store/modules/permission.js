/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:24:23
 * @LastEditTime: 2022-07-11 11:04:11
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
          icon: "Menu",
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
          icon: "Menu",
        },
      },
      {
        parentName:'Layout',
        name:"ceshi",
        path:'/ceshi',
        component:()=>import('@/views/ceshi/index.vue'),
        meta: {
          title: "测试",
          icon: "Menu",
        },
      },
      {
        parentName:"Layout",
        name:'docxexport',
        path:'/docxexport',
        component:()=>import('@/views/docxexport/index.vue'),
        meta:{
          title:'docx模板导出',
          icon: "Menu",
        }
      },
      {
        parentName:'Layout',
        name:'functionPostting',
        path:'/functionPostting',
        component:()=>import('@/views/functionPostting/index.vue'),
        meta:{
          title:"函数式的封装",
          icon: "Menu",
        }
      },
      {
        parentName:'Layout',
        name:'customTable',
        path:'/customTable',
        component:()=>import('@/views/customTable/index.vue'),
        meta:{
          title:"自定义table组件",
          icon: "Menu",
        }
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
