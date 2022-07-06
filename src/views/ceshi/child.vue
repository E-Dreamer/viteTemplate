<!--
 * @Author: E-Dreamer
 * @Date: 2021-10-21 11:40:25
 * @LastEditTime: 2022-06-28 14:10:14
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <el-input v-model="msg"></el-input>
  <el-input type='textarea' v-model="msg1"></el-input>
</template>

<script >
import { reactive, toRefs ,watch} from 'vue'
export default {
  name:"child",
  props:{
    count:{
      type:[Number,String],
      default:''
    },
    text:{
      type:String
    },
    getDom:{
      type:Function
    }
  },
  emits:['update:count','update:text'],
  setup (props,content) {
    console.log(props,content)
    const state = reactive({
      msg: props.count,
      msg1:props.text
    })
    //单个v-model emit触发的事件名为 update:modelValue
    // 多个v-model就是update:props的名称
    watch(()=>state.msg,(newv)=>{
      content.emit('update:count',newv)
    })
     watch(()=>state.msg1,(newv)=>{
      content.emit('update:text',newv)
    })
    return {
      ...toRefs(state)
    }
  }
}

</script>