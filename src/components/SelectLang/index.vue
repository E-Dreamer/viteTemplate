<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-10 09:26:13
 * @LastEditTime: 2021-09-10 10:42:35
 * @LastEditors: E-Dreamer
 * @Description: 改变语言
-->
<template>
  <el-dropdown trigger="click"
               :size='size'
               @command="handleSetSize">
    <div>
      <svg-icon icon-class="international" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item of options"
                          :key="item.value"
                          :disabled="locale === item.value"
                          :command="item.value">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { computed, reactive, toRefs, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import sizefn from '@/components/size'
export default {
  setup () {
    const { size } = sizefn();
    const i18n = useI18n()
    const state = reactive({
      options: [
        { label: '简体中文', value: 'zh-cn' },
        { label: 'English', value: 'en' },
      ],
      handleSetSize: (value) => {
        sessionStorage.setItem('locale', value);
        i18n.locale.value = value
      },
    })
    const locale = computed(() => {
      return i18n.locale.value
    })

    return {
      ...toRefs(state),
      locale,
      size
    }
  },
}
</script>

<style lang="less" scoped>
</style>