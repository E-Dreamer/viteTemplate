<template>
  <childTmp v-model='count'></childTmp>
</template>


<script>
import { reactive ,watch,toRefs} from 'vue'
import childTmp from './child.vue'
export default {
  components:{childTmp},
  setup() {
    const state = reactive({
      count:0
    })
    return {
      ...toRefs(state)
    }
  },
}
</script>