<template>
  <div>
    <childTmp v-model:count="count" v-model:text='text' :getDom="getDom"></childTmp>
    <p>{{ count }}</p>
    <p>{{ text }}</p>
  </div>
  <ceshiupload/>
</template>


<script>
import { reactive, toRefs } from 'vue'
import childTmp from './child.vue'
import ceshiupload from './ceshiupload.jsx'
export default {
  components: { childTmp,ceshiupload },
  setup () {
    const state = reactive({
      count: 0,
      text: '123123',
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

    return {
      ...toRefs(state),
    }
  },
}
</script>