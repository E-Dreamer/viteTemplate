<template>
  <div>
    <childTmp v-model:count="count" v-model:text='text' :getDom="getDom"></childTmp>
    <p>{{ count }}</p>
    <p>{{ text }}</p>
  </div>
</template>


<script>
import { reactive, watch, toRefs } from 'vue'
import childTmp from './child.vue'
export default {
  components: { childTmp },
  setup () {
    const state = reactive({
      count: 0,
      text: '',
      arr:[
        {
          label:"asdsad",
          value:1
        },
        {
          label:"saddsd",
          value:2,
        }
      ]
    })

    const getDom = ()=>{
      return `<div>这是什么玩意</div>
         <span>这是傻子呀</span>`
    }
    
    return {
      ...toRefs(state),
      getDom
    }
  },
}
</script>