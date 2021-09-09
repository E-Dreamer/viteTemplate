<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-07 16:05:41
 * @LastEditTime: 2021-09-09 15:33:57
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div :class="classobj"
       class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened"
         class="drawer-bg"
         @click="handleClickOutside">
    </div>
    <SideBar class="sidebar-container"></SideBar>
    <div :class="{ hasTagsView }"
         class="main-container">
      <div :class="{'fixed-header' : fixedHeader}">
        <NavBar></NavBar>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, onBeforeUnmount, onMounted } from "vue"
import { useStore } from "vuex";
import { SideBar, NavBar, AppMain } from './components/index'
import resize from './resize'
export default {
  components: { SideBar, NavBar, AppMain },
  name: 'Layout',
  setup () {
    const { sidebar,
      device,
      resizeMounted,
      addEventListenerOnResize,
      removeEventListenerResize,
      watchRouter } = resize();
    const store = useStore();
    const classobj = computed(() => {
      return {
        hideSideBar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        mobile: device.value === 'mobile',
        withoutAnimation: sidebar.value.withoutAnimation,
      }
    })
    const fixedHeader = computed(() => {
      return store.state.settings.fixedHeader
    })
    watchRouter
    const hasTagsView = computed(() => {
      return store.state.settings.hasTagsView
    })
    function handleClickOutside () {
      store.dispatch("app/closeSideBar");
      store.dispatch('app/toggleAnimation', { withoutAnimation: false });
    }
    onBeforeMount(() => {
      addEventListenerOnResize()
    })
    onMounted(() => {
      resizeMounted()
    })
    onBeforeUnmount(() => {
      removeEventListenerResize()
    })
    return {
      classobj,
      fixedHeader,
      device,
      sidebar,
      handleClickOutside,
      hasTagsView
    }
  },
}
</script>

<style lang="less" scoped>
@import "@/styles/mixin";
@import "@/styles/variable";
.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.sidebar-container {
  position: fixed;
  left: 0;
  top: 0;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - @sideBarWidth);
  transition: width 0.28s;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.hideSideBar .fixed-header {
  width: calc(100% - 54px);
}
.mobile .fixed-header {
  width: 100%;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>