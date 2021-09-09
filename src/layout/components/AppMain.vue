<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-09 09:24:33
 * @LastEditTime: 2021-09-09 11:08:27
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component }" :key="key">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const state = reactive({
      cachedViews : computed(()=>{
        return store.getters.cachedViews
      }),
      key:computed(()=>{
        return route.path;
      })
    })
    return {
      ...toRefs(state)
    }
  },
}
</script>

<style lang="less" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
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