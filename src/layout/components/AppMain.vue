<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-09 09:24:33
 * @LastEditTime: 2022-07-05 13:38:01
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in" :key="route.path">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
      <!-- <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.path"/>
      </keep-alive>-->
    </router-view>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore();
    const cachedViews = computed(() => {
      return store.getters.cachedViews
    });
    return {
      cachedViews
    }
  },
}
</script>

<style lang="less" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 84px);
  // height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>