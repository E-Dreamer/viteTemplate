<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-07 16:14:50
 * @LastEditTime: 2021-09-10 11:05:07
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div class="navbar">
    <Hamburger id="hamburger-container"
               :is-active="sidebar.opened"
               class="hamburger-container"
               @toggleClick="toggleSideBar" />

    <Breadcrumb></Breadcrumb>

    <div class="right_menu">
      <Screenfull class="right_menu_item hover_effect"></Screenfull>
      <template class="right_menu_item hover_effect">
        <SelectSize ></SelectSize>
      </template>
      <template class="right_menu_item hover_effect">
        <SelectLang></SelectLang>
      </template>
      <el-dropdown trigger="click" :size='size'
                   class="avatar_container right_menu_item hover_effect">
        <div class="avatar_wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'"
               class="user_avatar" />
          <el-icon>
            <caret-bottom />
          </el-icon>

        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="lockFull">
              <span style='display:block'>{{$t('lock')}}</span>
            </el-dropdown-item>
            <el-dropdown-item divided
                              @click="logout">
              <span style="display: block">{{$t('logout')}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Screenfull from "@/components/Screenfull/index.vue";
import SelectSize from '@/components/SelectSize/index.vue'
import SelectLang from '@/components/SelectLang/index.vue'
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue';
import sizefn from '@/components/size'
// import { CaretBottom } from '@element-plus/icons'
export default {
  name: 'Navbar',
  components: { Hamburger, Breadcrumb ,Screenfull,SelectSize,SelectLang},
  setup () {
    const {size} = sizefn()
    const store = useStore();
    const state = reactive({
      sidebar: computed(() => {
        return store.getters.sidebar;
      }),
      toggleSideBar: () => {
        store.dispatch("app/toggleSideBar")
      },
      avatar: computed(() => {
        return store.getters.avatar
      }),
      logout:()=>{
        console.log('退出登录')
      },
      lockFull:()=>{
        console.log('锁屏')
      }
    })

    return {
      ...toRefs(state),
      size
    }
  },
}
</script>

<style lang="less" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .right_menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }

    .right_menu_item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover_effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar_container {
      margin-right: 30px;

      .avatar_wrapper {
        margin-top: 5px;
        position: relative;

        .user_avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>