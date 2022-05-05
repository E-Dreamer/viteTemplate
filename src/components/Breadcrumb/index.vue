<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-09 08:38:26
 * @LastEditTime: 2022-05-05 09:25:08
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <el-breadcrumb class="app-breadcrumb"
                 separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList"
                          :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
              class="no-redirect">
          <template v-if='!reg(item.meta.title)'>
            {{ $t(item.meta.title) }}
          </template>
          <template v-else>
            {{item.meta.title}}
          </template>
        </span>
        <a v-else
           @click.prevent="handleLink(item)">
          <template v-if='!reg(item.meta.title)'>
            {{ $t(item.meta.title) }}
          </template>
          <template v-else>
            {{item.meta.title}}
          </template>
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>

// import pathToRegexp from 'path-to-regexp'
import { reactive, watch, toRefs, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import {reg} from '@/utils/utils'
export default {
  setup () {
    const currentRoute = useRoute()
    const router = useRouter();

    const pathCompile = (path) => {
      const { params } = currentRoute;
      var toPath = pathToRegexp.compile(path);
      console.log(toPath)
      return toPath(params);
    }
    const findHomePath = (routes) => {
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].name === 'home') {
          return routes[i]
        } else {
          if (routes[i].children && routes[i].children.length) {
            return findHomePath(routes[i].children)
          }
        }
      }
    }
    const state = reactive({
      levelList: null,
      getBreadcrumb () {
        // only show routes with meta.title
        let matched = currentRoute.matched.filter(
          (item) => item.meta && item.meta.title
        );
        const first = matched[0];

        const homepath = findHomePath(router.options.routes)
        if (!state.isHome(first)) {
          matched = [homepath].concat(matched);
        }

        state.levelList = matched.filter(
          (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
        );
      },
      isHome (route) {
        const name = route && route.name;
        if (!name) {
          return false;
        }
        return name.trim().toLocaleLowerCase() === "home".toLocaleLowerCase();
      },
      handleLink (item) {
        const { redirect, path } = item;
        if (redirect) {
          router.push(redirect);
          return;
        }
        router.push(item);
      },
    })

    watch(() => currentRoute.path, (path) => {
      if (path.startsWith("/redirect/")) {
        return;
      }
      state.getBreadcrumb();
    })

    onBeforeMount(() => {
      state.getBreadcrumb();
    })
    return {
      ...toRefs(state),
      reg
    }
  },
}
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
