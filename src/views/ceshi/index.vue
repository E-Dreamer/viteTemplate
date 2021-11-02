<template>
  <div>
    <childTmp v-model:count="count" v-model:text='text'></childTmp>
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
    return {
      ...toRefs(state)
    }
  },
}
</script>