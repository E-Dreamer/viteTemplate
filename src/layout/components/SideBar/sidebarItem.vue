<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:19:36
 * @LastEditTime: 2021-09-09 10:25:26
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>
    <template v-if="!item.children">
      <router-link :to="{ path: `${item.path}` }">
        <el-menu-item :index="item.path">
          <i :class="item.meta.icon"></i>
          <template #title>
            <span v-if='!reg(item.meta.title)'>
              {{ $t(item.meta.title) }}
            </span>
            <span v-else>
              {{item.meta.title}}
            </span>
          </template>
        </el-menu-item>
      </router-link>
    </template>
    <el-sub-menu v-else>
      <template #title>
        <i :class="item.meta.icon"></i>
        <span v-if='!reg(item.meta.title)'>
          {{ $t(item.meta.title) }}
        </span>
        <span v-else>
          {{item.meta.title}}
        </span>
      </template>
      <sidebar-item v-for="item in item.children"
                    :key="item.path"
                    :item="item"></sidebar-item>
    </el-sub-menu>
  </div>
</template>

<script>
import {reg} from '@/utils/utils'
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
      required: true,
    },
  },
  setup () {
    return {
      reg
    }
  },
};
</script>
