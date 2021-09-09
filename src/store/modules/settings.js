/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 14:36:38
 * @LastEditTime: 2021-09-09 10:35:28
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import all from '@/settings'
let {title,Logo,sidebarLogo,fixedHeader,hasTagsView} = all;
const settings = {
  namespaced:true,
  state:{
    title,
    Logo,
    showLogo:sidebarLogo,
    fixedHeader,
    hasTagsView
  },
  mutations:{
    SET_TITLE(state,value){
      state.title = value;
    },
    SET_LOGO(state,value){
      state.Logo = value;
    },
    SET_SHOWLOGO(state,value){
      state.showLogo = value;
    },
    SET_FIXEDHEADER(state,value){
      state.fixedHeader = value
    },
    SET_HASTAGSVIEW(state,value){
      state.hasTagsView = value;
    }
  },
  actions:{
    
  }
}

export default settings