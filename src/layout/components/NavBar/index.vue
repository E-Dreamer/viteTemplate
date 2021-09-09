<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-07 16:14:50
 * @LastEditTime: 2021-09-09 16:02:11
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
      <!-- <Screenfull></Screenfull> -->
      <el-dropdown trigger="click"
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
            <router-link to="/profile/index">
              <el-dropdown-item>Profile</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
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
// import Screenfull from "@/components/Screenfull";
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue';
// import { CaretBottom } from '@element-plus/icons'
export default {
  name: 'Navbar',
  components: { Hamburger, Breadcrumb },
  setup () {
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
      }
    })

    return {
      ...toRefs(state)
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