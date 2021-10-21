<template>
  <childTmp @inputMsg='fn'></childTmp>
</template>


<script>
import { reactive ,watch,toRefs} from 'vue'
import childTmp from './child.vue'
export default {
  components:{childTmp},
  setup() {
    const fn = (value)=>{
      console.log(value)
    }
    return {
      fn,
    }
  },
}
</script>