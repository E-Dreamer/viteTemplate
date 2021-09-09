/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 11:07:00
 * @LastEditTime: 2021-09-09 09:27:49
 * @LastEditors: E-Dreamer
 * @Description: 
 */
export default {
  title:(state)=> state.settings.title,
  Logo:(state)=>state.settings.Logo,
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  name:(state) => state.user.name,
  avatar:(state) => state.user.avatar,
  routes:(state)=>state.permission.routes,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
}