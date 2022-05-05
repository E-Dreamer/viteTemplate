<!--
 * @Author: E-Dreamer
 * @Date: 2022-05-05 08:57:54
 * @LastEditTime: 2022-05-05 09:14:11
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div class="box">
    <div @click="logIn">第一个系统</div>
    <div>第二个系统</div>
    <div>第三个系统</div>
  </div>
</template>

<script>
import { toRefs, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    onMounted(() => { })
    const state = reactive({})
    const logIn = ()=>{
      router.push('/system')
    }
    return {
      ...toRefs(state),
      logIn
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  display: flex;
  justify-content: space-around;
  >div {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    text-align: center;
    cursor: pointer;
  }
}
</style>