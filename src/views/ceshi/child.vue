<!--
 * @Author: E-Dreamer
 * @Date: 2021-10-21 11:40:25
 * @LastEditTime: 2021-10-21 13:07:43
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <el-input v-model="msg"></el-input>
</template>

<script >
import { reactive, toRefs ,watch} from 'vue'
export default {
  name:"child",
  emits:['inputMsg'],
  setup (props,content) {
    console.log(props,content)
    const state = reactive({
      msg: ''
    })

    watch(()=>state.msg,(newv)=>{
      content.emit('inputMsg',newv)
    })
    return {
      ...toRefs(state)
    }
  }
}

</script>