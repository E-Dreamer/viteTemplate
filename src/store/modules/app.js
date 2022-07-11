/*
 * @Author: E-Dreamer
 * @Date: 2021-09-06 09:53:22
 * @LastEditTime: 2022-07-11 10:38:16
 * @LastEditors: E-Dreamer
 * @Description:
 */
import Cookies from "js-cookie";
const app = {
  namespaced: true,
  state: {
    sidebar: {
      opened: Cookies.get("sidebarStatus") ?
        !!+Cookies.get("sidebarStatus") : true,
      withoutAnimation: false,
    },
    device: "desktop",
    size: Cookies.get("size") || "small",
  },
  mutations: {
    // 切换侧边栏信息
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        Cookies.set("sidebarStatus", 1);
      } else {
        Cookies.set("sidebarStatus", 0);
      }
    },
    // 关闭侧边栏
    CLOSE_SIDEBAR: (state) => {
      Cookies.set("sidebarStatus", 0);
      state.sidebar.opened = false;
    },
    // 是否添加transition
    TOGGOLE_WITHOUTANIMATION(state, withoutAnimation) {
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    // 切换信息
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SET_SIZE: (state, size) => {
      state.size = size;
      Cookies.set("size", size);
    },
  },
  actions: {
    toggleSideBar({
      commit
    }) {
      commit("TOGGLE_SIDEBAR");
    },
    closeSideBar({
      commit
    }) {
      commit("CLOSE_SIDEBAR");
    },
    toggleAnimation({
      commit
    }, {
      withoutAnimation
    }) {
      commit('TOGGOLE_WITHOUTANIMATION', withoutAnimation)
    },
    toggleDevice({
      commit
    }, device) {
      commit("TOGGLE_DEVICE", device);
    },
    setSize({
      commit
    }, size) {
      commit("SET_SIZE", size);
    }
  },
};

export default app;