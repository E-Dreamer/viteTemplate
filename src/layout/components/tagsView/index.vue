<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-10 08:40:20
 * @LastEditTime: 2021-09-10 15:29:13
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div class="tagsview">
    <router-link v-for="tag in visitedViews"
                 ref="tag"
                 :key="tag.path"
                 :class="isActive(tag)?'active':''"
                 :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                 tag="span"
                 class="tags-view-item">
      <span v-if='!reg(tag.title)'>
        {{ $t(tag.title) }}
      </span>
      <span v-else>
        {{tag.title}}
      </span>
      <span v-if="!isAffix(tag)"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)" />
    </router-link>
  </div>
</template>

<script>
import { reg } from '@/utils/utils'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
export default {
  setup () {
    const currentRoute = useRoute();
    const store = useStore();
    const router = useRouter()
    const visitedViews = computed(() => {
      return store.getters.visitedViews
    })
    const routes = computed(()=>{
      return store.getters.routes
    })
    const state = reactive({
      affixTags: [],
      isActive: (route) => {
        return currentRoute.path === route.path
      },
      filterAffixTags (routes, basePath = "/") {
        let tags = [];
        routes.forEach((route) => {
          if (route.meta && route.meta.affix) {
            // const tagPath = path.resolve(basePath, route.path);
            const tagPath = route.path
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta },
            });
          }
          if (route.children) {
            const tempTags = state.filterAffixTags(route.children, route.path);
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags];
            }
          }
        });
        return tags;
      },
      initTags: () => {
        const affixTags = (state.affixTags = state.filterAffixTags(
          routes.value
        ));
        for (const tag of affixTags) {
          // Must have tag name
          if (tag.name) {
            store.dispatch("tagsView/addVisitedView", tag);
          }
        }
      },
      isAffix: (tag) => {
        return tag.meta && tag.meta.affix;
      },
      closeSelectedTag: (view) => {
        store.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
          console.log(visitedViews)
          if (state.isActive(view)) {
            state.toLastView(visitedViews, view);
          }
        });
      },
      toLastView: (visitedViews, view) => {
        const latestView = visitedViews.slice(-1)[0];
        if (latestView) {
          router.push(latestView.fullPath);
        } else {
          // now the default is to redirect to the home page if there is no tags-view,
          // you can adjust it according to your needs.
          if (view.name === "home") {
            // to reload home page
            router.replace({ path: view.fullPath });
          } else {
            router.push("/");
          }
        }
      },
    })

    onMounted(()=>{
      state.initTags()
    })
    return {
      reg,
      visitedViews,
      ...toRefs(state)
    }
  },
}
</script>

<style lang="less" scoped>
.tagsview {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
    }
  }
}
</style>