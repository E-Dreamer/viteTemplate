<!--
 * @Author: E-Dreamer
 * @Date: 2021-10-21 11:40:25
 * @LastEditTime: 2021-10-27 10:19:20
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
  props:{
    count:{
      type:Number | String
    }
  },
  setup (props,content) {
    console.log(props,content)
    const state = reactive({
      msg: ''
    })

    // watch(()=>state.msg,(newv)=>{
    //   content.emit('inputMsg',newv)
    // })
    return {
      ...toRefs(state)
    }
  }
}

</script>