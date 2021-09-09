/*
 * @Author: E-Dreamer
 * @Date: 2021-09-09 09:26:50
 * @LastEditTime: 2021-09-09 09:30:33
 * @LastEditors: E-Dreamer
 * @Description: 
 */
const tagsView = {
  namespaced:true,
  state:{
    visitedViews:[],
    cachedViews:[]
  },
  mutations:{
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some((v) => v.path === view.path)) return;
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || "no-name",
        })
      );
    },
  }
}

export default tagsView