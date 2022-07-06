<!--
 * @Author: E-Dreamer
 * @Date: 2022-07-06 13:49:41
 * @LastEditTime: 2022-07-06 14:30:59
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>
    <slot name="left" />
    <el-button v-if="crud.optShow.edit" :loading="crud.status.cu === 2" size="small"
      :type="btnType || 'primary'" icon="el-icon-edit" @click="crud.toEdit(data)">
      <template v-if="btnType === 'text'">编辑</template>
    </el-button>
    <slot />
    <el-popover v-model="pop" v-permission="permission.del" placement="top" width="180" trigger="manual"
      @show="onPopoverShow" @hide="onPopoverHide">
      <p>{{ msg }}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="small" type="text" @click="doCancel">取消</el-button>
        <el-button
          :loading="crud.dataStatus[crud.getDataId(data)] && crud.dataStatus[crud.getDataId(data)].delete === 2"
          type="primary" size="small" @click="crud.doDelete(data)">确定</el-button>
      </div>
      <el-button v-if="crud.optShow.del" :class="[btnType && 'danger-text-btn']" :disabled="disabledDle"
        :type="btnType || 'danger'" icon="el-icon-delete" size="small" @click="toDelete">
        <template ##reference v-if="btnType === 'text'">删除</template>
      </el-button>
    </el-popover>
    <slot name="right" />
  </div>
</template>

<script>
import { toRefs, reactive, onMounted } from 'vue'
export default {
  props: {
    crud: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup () {
    onMounted(() => { })
    const state = reactive({})
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang='less' scoped>
</style>