<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:24:51
 * @LastEditTime: 2021-11-15 09:50:37
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>home</div>
  {{msg}}
  <el-button v-copy="msg">复制msg内容</el-button>
  <el-button @click="change">点击改变msg</el-button>
</template>

<script>
import { onMounted, getCurrentInstance, ref, unref, provide, reactive,toRefs } from 'vue'
export default {
  name: 'home',
  setup () {
    const { appContext: { config: { globalProperties: { $Toast } } } } = getCurrentInstance()
    const count = ref(12)
    provide('name', '张三')

    const state = reactive({
      msg: '自定义指令，复制内容'
    })
    onMounted(() => {
      console.log('缓存的页面')
      // $Toast({
      //   message:'提示',
      //   duration:4000
      // })
    })
    const change = ()=>{
      state.msg = '改变了自定义指令复制的内容'
    }
    return {
      ...toRefs(state),
      change
    }
  },
}
</script>