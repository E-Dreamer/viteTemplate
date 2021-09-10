/*
 * @Author: E-Dreamer
 * @Date: 2021-09-09 09:26:50
 * @LastEditTime: 2021-09-10 14:39:22
 * @LastEditors: E-Dreamer
 * @Description: 
 */
const tagsView = {
  namespaced: true,
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some((v) => v.path === view.path)) return;
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || "no-name",
        })
      );
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return
      if (view.meta.keepAlive) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEW: (state, view) => {
      // entries() 返回 [ 0 ,arr[1]]
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      const index = state.cachedViews.indexOf(view.name)
      index > -1 && state.cachedViews.splice(index, 1)
    },
    DEL_ALL_VISITED_VIEWS: state => {
      // keep affix tags
      const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
      state.visitedViews = affixTags
    },
    DEL_ALL_CACHED_VIEWS: state => {
      state.cachedViews = []
    },
    UPDATE_VISITED_VIEW: (state, view) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
  actions: {
    addView({
      dispatch
    }, view) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
    },
    addVisitedView({
      commit
    }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    addCachedView({
      commit
    }, view) {
      commit('ADD_CACHED_VIEW', view)
    },
    delView({
      dispatch,
      state
    }, view) {
      return new Promise(resolve => {
        dispatch('delVisitedView', view)
        dispatch('delCachedView', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delVisitedView({
      commit,
      state
    }, view) {
      return new Promise(resolve => {
        commit('DEL_VISITED_VIEW', view)
        resolve([...state.visitedViews])
      })
    },
    delCachedView({
      commit,
      state
    }, view) {
      return new Promise(resolve => {
        commit('DEL_CACHED_VIEW', view)
        resolve([...state.cachedViews])
      })
    },
    delAllViews({
      dispatch,
      state
    }, view) {
      return new Promise(resolve => {
        dispatch('delAllVisitedViews', view)
        dispatch('delAllCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delAllVisitedViews({
      commit,
      state
    }) {
      return new Promise(resolve => {
        commit('DEL_ALL_VISITED_VIEWS')
        resolve([...state.visitedViews])
      })
    },
    delAllCachedViews({
      commit,
      state
    }) {
      return new Promise(resolve => {
        commit('DEL_ALL_CACHED_VIEWS')
        resolve([...state.cachedViews])
      })
    },
    updateVisitedView({
      commit
    }, view) {
      commit("UPDATE_VISITED_VIEW", view);
    },
  }
}

export default tagsView