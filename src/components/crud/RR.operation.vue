<!--
 * @Author: E-Dreamer
 * @Date: 2022-07-06 13:49:41
 * @LastEditTime: 2022-07-07 16:49:18
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>
    <slot name="left" />
    <el-button v-if="crud.optShow.edit" v-auth="auth.edit" :loading="crud.status.cu === 2" size="small"
      :disabled="disabledEdit" :type="btnType || 'primary'" icon="el-icon-edit" @click="crud.toEdit(data)">
      <template v-if="btnType === 'text'">编辑</template>
    </el-button>
    <slot />
    <!-- -->
    <!-- :loading="crud.dataStatus[crud.getDataId(data)] && crud.dataStatus[crud.getDataId(data)].delete === 2" -->
    <el-popover v-model:visible="pop" v-auth="auth.del" placement="top" width="180" trigger="click"
      @show="onPopoverShow" @hide="onPopoverHide">
      <template #reference>
        <el-button v-if="crud.optShow.del" :class="[btnType && 'danger-text-btn']" :disabled="disabledDle"
          :type="btnType || 'danger'" icon="el-icon-delete" size="small" @click="toDelete">
        </el-button>
      </template>
      <p>{{ msg }}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="small" type="text" @click="doCancel">取消</el-button>

        <el-button type="primary" size="small" @click="crud.doDelete(data)">确定</el-button>
      </div>
    </el-popover>
    <slot name="right" />
  </div>
</template>

<script lang="ts">
import { MessageType } from 'element-plus';
import { toRefs, reactive, PropType } from 'vue'
import { CrudProps, AuthProps } from './types/crudProps';
export default {
  props: {
    crud: {
      type: Object as PropType<CrudProps>,
      default: () => { return {} }
    },
    auth: {
      type: Object as PropType<AuthProps>,
      required: true
    },
    // 当前行数据
    data: {
      type: Object,
      default: () => { return {} }
    },
    //禁用edit
    disabledEdit: {
      type: Boolean,
      default: false
    },
    //禁用删除
    disabledDle: {
      type: Boolean,
      default: false
    },
    //按钮类型
    btnType: {
      type: String as PropType<MessageType>,
      default: ''
    },
    // 弹出消息内容
    msg: {
      type: String,
      default: '确定删除本条数据吗？'
    }
  },
  setup(props) {
    const crud = props.crud
    const state = reactive({
      pop: false
    })
    const handleDocumentClick = () => {
      state.pop = false;
    }
    const onPopoverShow = () => {
      setTimeout(() => {
        document.addEventListener('click', handleDocumentClick)
      }, 0)
    }

    const onPopoverHide = () => {
      document.removeEventListener('click', handleDocumentClick)
    }

    const doCancel = () => {
      state.pop = false;
      // crud.cancelDelete(props.data)
    }

    const toDelete = () => {
      // crud.beforeClickDelete(props.data)
      state.pop = true;
    }
    // crud.HOOK.afterDelete = (crud, data) => {

    // }
    return {
      ...toRefs(state),
      onPopoverShow,
      onPopoverHide,
      doCancel,
      toDelete
    }
  }
}
</script>
<style lang='less' scoped>
:deep(.el-button) {
  padding: 0 10px !important;
  min-height: 25px;
  box-sizing: border-box;
}
</style>