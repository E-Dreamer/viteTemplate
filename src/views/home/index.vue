<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:24:51
 * @LastEditTime: 2021-12-01 09:39:59
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>home</div>
  {{ msg }}
  <el-button v-copy="msg">复制msg内容</el-button>
  <el-button @click="change">点击改变msg</el-button>
</template>

<script>
import { onMounted, getCurrentInstance, ref, unref, provide, reactive, toRefs, inject } from 'vue'
export default {
  name: 'home',
  setup (props, context) {
    const { appContext: { config: { globalProperties: { $Toast } } } } = getCurrentInstance()
    const count = ref(12)
    const $MesBox = inject('$MesBox')
    provide('name', '张三')

    const state = reactive({
      msg: '自定义指令，复制内容'
    })
    onMounted(() => {
      console.log('缓存的页面')
      $Toast({
        message: '提示',
        duration: 4000
      })

      $MesBox({ title: '标题', type: 'success', message: "这是内容",showCancelButton:true }).then(
        () => { console.log('点击确定') }
      ).catch(() => { console.log('点击取消') })
    })
    const change = () => {
      state.msg = '改变了自定义指令复制的内容'
    }
    return {
      ...toRefs(state),
      change
    }
  },
}
</script>