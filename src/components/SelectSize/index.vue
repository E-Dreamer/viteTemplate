<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-10 09:00:49
 * @LastEditTime: 2021-09-10 10:35:44
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <el-dropdown trigger="click" :size='size'
               @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon"
                icon-class="size" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item of sizeOptions"
                          :key="item.value"
                          :disabled="size===item.value"
                          :command="item.value">
          {{ $t(item.label) }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { computed, reactive, toRefs,nextTick ,getCurrentInstance} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
export default {
  setup () {
    const { appContext : { config: { globalProperties } } } = getCurrentInstance()
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      sizeOptions: [
        { label: 'size.default', value: 'default' },
        { label: 'size.medium', value: 'medium' },
        { label: 'size.small', value: 'small' },
        { label: 'size.mini', value: 'mini' }
      ],
      handleSetSize: (size) => {
        globalProperties.$ELEMENT.size = size;
        store.dispatch('app/setSize', size)
        state.refreshView();
        ElMessage({
          message: 'Switch Size Success',
          type: 'success'
        })
      },
      refreshView () {
        // In order to make the cached page re-rendered
        store.dispatch('tagsView/delAllCachedViews', route)

        const { fullPath } = route

        nextTick(() => {
          router.replace({
            path: fullPath
          })
        })
      }
    })
    const size = computed(() => {
      return store.getters.size
    })
    return {
      ...toRefs(state),
      size
    }
  },
}
</script>

<style lang="less" scoped>
</style>