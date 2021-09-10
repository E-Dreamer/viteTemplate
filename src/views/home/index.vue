<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:24:51
 * @LastEditTime: 2021-09-10 14:45:27
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>home</div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  name:'home',
  setup () {
    onMounted(() => {
      console.log('缓存的页面')
    })
  },
}
</script>