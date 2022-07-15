<!--
 * @Author: E-Dreamer
 * @Date: 2022-07-06 13:49:41
 * @LastEditTime: 2022-07-15 14:50:20
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>
    <slot name="left" />
    <!--  -->
    <span v-auth="auth.edit" class="btn">
      <el-button v-if="crud.optShow.edit" :loading="crud.status.cu === 2" size="small" :disabled="disabledEdit"
        type="primary" icon="edit" @click="crud.toEdit(data)">
      </el-button>
    </span>
    <slot />

    <span v-auth="auth.del" class="btn">
      <el-popover v-model:visible="pop" placement="top" width="180" trigger="click" @show="onPopoverShow"
        @hide="onPopoverHide">
        <template #reference>
          <el-button v-if="crud.optShow.del" icon="delete" size="small" @click="toDelete" :loading="loading"
            class="danger-text-btn" :disabled="disabledDle" type="danger"></el-button>
        </template>
        <p>{{ msg }}</p>
        <div style="text-align: right; margin: 0">
          <el-button size="small" type="text" @click="doCancel">取消</el-button>
          <el-button type="primary" size="small" @click="crud.doDelete(data)">确定</el-button>
        </div>
      </el-popover>
    </span>


    <slot name="right" />
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, PropType, computed } from 'vue'
import { useCrudProps, AuthProps } from './types/types';
export default {
  props: {
    crud: {
      type: Object as PropType<useCrudProps>,
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
    // 弹出消息内容
    msg: {
      type: String,
      default: '确定删除本条数据吗？'
    }
  },
  setup(props: { crud: useCrudProps, data: object }) {
    const crud = props.crud
    const state = reactive({
      pop: false
    })
    const loading = computed(() => {
      const key = crud.getDataId(props.data)
      return crud.dataStatus[key] &&  crud.dataStatus[key].delete === 2
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
      crud.cancelDelete(props.data)
    }

    const toDelete = () => {
      crud.beforeClickDelete(props.data)
      state.pop = true;
    }
    crud.HOOK.afterDelete = (crud, data) => {
      if (data === props.data) {
        state.pop = false
      }
    }
    return {
      ...toRefs(state),
      onPopoverShow,
      onPopoverHide,
      doCancel,
      toDelete,
      loading
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

.btn {
  margin-right: 10px;
}
</style>