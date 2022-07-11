<!--
 * @Author: 陈诚
 * @Date: 2021-09-06 09:24:10
 * @LastEditTime: 2021-09-06 15:36:53
 * @LastEditors: 陈诚
 * @Description:
-->
<template>
  <div class="sidebar-logo-container"
       :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse"
                   key="collapse"
                   class="sidebar-logo-link"
                   to="/">
        <img v-if="logoImg"
             :src="logoImg"
             class="sidebar-logo" />
        <h1 v-else
            class="sidebar-title">
          {{ title }}
        </h1>
      </router-link>
      <router-link v-else
                   key="expand"
                   class="sidebar-logo-link"
                   to="/">
        <img v-if="logoImg"
             :src="logoImg"
             class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from "vuex";
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  setup () {
    const store = useStore();
    const title = computed(() => {
      return store.getters.title
    })
    const logoImg = computed(() => {
      return store.getters.Logo
    })
    return {
      title,
      logoImg,
    }
  }
};
</script>

<style lang="less" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
