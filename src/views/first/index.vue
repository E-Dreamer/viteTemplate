<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:25:07
 * @LastEditTime: 2021-09-10 14:46:03
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>first</div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  name:"first",
  setup () {
    onMounted(() => {
      console.log('未缓存的页面')
    })
  },
}
</script>

<style lang="less" scoped>
div {
  font-size: 30px;
}
</style>