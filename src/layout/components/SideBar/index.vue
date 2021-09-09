<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-07 16:14:40
 * @LastEditTime: 2021-09-09 14:48:20
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo :collapse='isCollapse'></Logo>
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu"
               :collapse="isCollapse"
               :background-color="variable.menuBg"
               :text-color="variable.menuText"
               :unique-opened="false"
               :active-text-color="variable.menuActiveText"
               :collapse-transition="false"
               mode="vertical">
        <sidebarItem v-for='item in routes'
                     :key='item.path'
                     :item='item'></sidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Logo from './Logo.vue'
import sidebarItem from './sidebarItem.vue'
import { computed, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router';
export default {
  components: { Logo, sidebarItem },
  name: 'SideBar',
  setup (props, context) {
    const store = useStore();
    const route = useRoute()
    const state = reactive({
      showLogo: computed(() => {
        store.state.settings.showLogo
      }),
      routes: computed(() => {
        return store.getters.routes
      }),
      sidebar: computed(() => {
        return store.getters.sidebar
      }),
      isCollapse: computed(() => {
        return !state.sidebar.opened
      }),
      activeMenu: computed(() => {
        const { meta, path } = route;
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      }),
      variable:{
        menuBg:'#2b2f3a',
        menuText:'#bfcbd9',
        menuActiveText:'#409eff'
      }
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>