<!--
 * @Author: E-Dreamer
 * @Date: 2021-11-15 14:46:00
 * @LastEditTime: 2021-11-15 16:16:57
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div class="mark" v-if="show">
    <div class="mesbox">
      <div class="header">
        <div class="header_title">{{ title }}</div>
        <div class="closeBtn">
           <Close />
        </div>
      </div>
      <div class="content">
        <div class="icon">
          <warning v-if="type === 'warning'" />
        </div>
        <div class="message">{{ message }}</div>
      </div>
      <div class="btns">
        <el-button size="small" @click="cancel" v-if="showCancelButton">{{ cancelButtonText }}</el-button>
        <el-button
          size="small"
          @click="ok"
          type="primary"
          v-if="showConfirmButton"
        >{{ confirmButtonText }}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { ElButton } from 'element-plus'
import { Close } from '@element-plus/icons'
import { reactive, toRefs } from 'vue'
export default {
  components: { ElButton ,Close},
  setup () {
    const state = reactive({
      show: false,
      title: '',
      message: '',
      // success / info / warning / error
      type: "",
      showConfirmButton: true,
      showCancelButton: false,
      cancelButtonText: 'cancel',
      confirmButtonText: 'ok'
    })
    return {
      ...toRefs(state)
    }
  },
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.mark {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  background-color: #00000080;
  overflow: auto;
  z-index: 2222;
}

.mesbox {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 420px;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
  z-index: 9999;
}
.header {
  position: relative;
  padding: 15px;
  padding-bottom: 10px;
  // display: flex;
  .header_title {
    padding-left: 0;
    margin-bottom: 0;
    font-size: 18px;
    line-height: 1;
    color: #303133;
  }
  .closeBtn {
    // margin-left: auto;
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    cursor: pointer;
  }
}
.content {
  padding: 10px 15px;
  color: #606266;
  font-size: 14px;
}
.btns {
  padding: 5px 15px 0;
  text-align: right;
}
</style>