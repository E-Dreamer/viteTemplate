<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:24:51
 * @LastEditTime: 2021-09-18 13:57:47
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>home</div>
</template>

<script>
import { onMounted,getCurrentInstance } from 'vue'
export default {
  name:'home',
  setup () {
    const {appContext:{config:{globalProperties:{$Toast}}}} = getCurrentInstance()
    onMounted(() => {
      console.log('缓存的页面')
      $Toast({
        message:'提示',
        duration:4000
      })
    })
  },
}
</script>