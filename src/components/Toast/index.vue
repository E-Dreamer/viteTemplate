<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-18 13:35:11
 * @LastEditTime: 2021-09-18 14:14:22
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div class="le-toast"
       v-show="visible">
    <div class="le-toast-box">
      <!-- <le-icon class="icon"
               v-if="iconName"
               size="40px"
               :name="iconName" /> -->
      <span class="message">{{ message }}</span>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'Toast',
  setup () {
    const state = reactive({
      visible: false,
      iconName: '',
      message: '',
      duration: 2000,
      close: () => {
        state.visible = false
      }
    })
    return {
      ...toRefs(state)
    }
  },
}
</script>

<style lang="less" scoped>
.le-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  bottom: inherit !important;
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
  box-sizing: border-box;
  z-index: 1001;
  text-align: center;

  &-box {
    width: auto;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    padding: 20px;
    font-size: 13px;
    max-width: 282px;
    color: #fff;
    display: inline-block;
    word-break: break-all;
    margin: 0 auto;
    text-align: center;

    .icon {
      display: block;
      font-size: 26px;
      padding: 2px;
      margin-bottom: 8px;
    }

    .message {
      font-size: 14px;
      display: block;
    }
  }
}
</style>
