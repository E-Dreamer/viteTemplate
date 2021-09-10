<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-10 14:16:34
 * @LastEditTime: 2021-09-10 14:28:07
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <el-scrollbar ref="scrollContainerRef"
                :vertical="false"
                class="scroll-container"
                @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script> 
import { onMounted, onBeforeUnmount, reactive, toRefs, computed, ref,getCurrentInstance } from 'vue'

export default {
  emits: ['scroll'],
  setup (props, context) {
    const scrollContainerRef = ref(null)
    const scrollWrapper = computed(() => {
      return scrollContainerRef.value.$refs.wrap
    })
    const { ctx } = getCurrentInstance()
    const tagSpacing = 4 // tagAndTagSpacing
    const state = reactive({
      left: 0,
      handleScroll: (e) => {
        const eventDelta = e.wheelDelta || -e.deltaY * 40
        scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollLeft + eventDelta / 4
      },
      moveToCurrentTag: (currentTag) => {
        const container = scrollContainerRef.value.$el;
        const containerWidth = container.offsetWidth
        const tagList = ctx.$parent.$refs.tag;
        let fristTag = null
        let lastTag = null
        // find first tag and last tag
        if (tagList.length > 0) {
          fristTag = tagList[0]
          lastTag = tagList[tagList.length - 1]
        }
        if (fristTag === currentTag) {
          scrollWrapper.value.scrollLeft = 0
        } else if (lastTag === currentTag) {
          scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollWidth - containerWidth
        } else {
          // find preTag and nextTag
          const currentIndex = tagList.findIndex(item => item === currentTag)
          const prevTag = tagList[currentIndex - 1]
          const nextTag = tagList[currentIndex + 1]
          // the tag's offsetLeft after of nextTag
          const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagSpacing
          // the tag's offsetLeft before of prevTag
          const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagSpacing
          if (afterNextTagOffsetLeft > scrollWrapper.value.scrollLeft + containerWidth) {
            scrollWrapper.value.scrollLeft = afterNextTagOffsetLeft - containerWidth
          } else if (beforePrevTagOffsetLeft < scrollWrapper.value.scrollLeft) {
            scrollWrapper.value.scrollLeft = beforePrevTagOffsetLeft
          }
        }
      }
    })
    const emitScroll = () => {
      context.emit('scroll')
    }
    onMounted(() => {
      scrollWrapper.value.addEventListener('scroll', emitScroll, true)
    })
    onBeforeUnmount(() => {
      scrollWrapper.value.removeEventListener('scroll', emitScroll)
    })
    return {
      ...toRefs(state),
      scrollContainerRef
    }
  },
}
</script>
<style lang="less" scoped>
.scroll-container {
  .el-scrollbar__bar {
    bottom: 0px;
  }
  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>

<style lang="less" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}
</style>