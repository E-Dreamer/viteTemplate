/*
 * @Author: E-Dreamer
 * @Date: 2021-09-10 10:10:19
 * @LastEditTime: 2021-09-10 10:19:31
 * @LastEditors: E-Dreamer
 * @Description: 
 */

import {
  useStore
} from "vuex"
import {
  computed
} from 'vue'

export default function(){
  const size = computed(() => {
    return useStore().getters.size;
  })
  return {
    size
  }
}