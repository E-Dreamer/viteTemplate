<template>
  <div class="crud-opts">
    <span class="crud-opts-left">
      <!--左侧插槽-->
      <slot name="left" />
      <el-button v-if="crud.optShow.add" v-auth="auth.add" class="filter-item" size="small" type="primary"
        icon="el-icon-plus" @click="crud.toAdd">
        新增
      </el-button>
      <el-button v-if="crud.optShow.edit" v-auth="auth.edit" class="filter-item" size="small" type="success"
        icon="el-icon-edit" :disabled="crud.selections.length !== 1" @click="crud.toEdit(crud.selections[0])">
        修改
      </el-button>
      <el-button v-if="crud.optShow.del" v-auth="auth.del" class="filter-item" type="danger" icon="el-icon-delete"
        size="small" :loading="crud.delAllLoading" :disabled="crud.selections.length === 0"
        @click="toDelete(crud.selections)">
        删除
      </el-button>
      <el-button v-if="crud.optShow.download" v-auth="auth.download" :loading="crud.downloadLoading"
        :disabled="!crud.data.length" class="filter-item" size="small" type="warning" icon="el-icon-download"
        @click="crud.doExport">导出</el-button>
      <!--右侧-->
      <slot name="right" />
    </span>
    <el-button-group class="crud-opts-right">
      <el-button size="small" plain type="info" icon="el-icon-search" @click="crud.toggleChange" />
      <el-button size="small" icon="el-icon-refresh" @click="crud.refresh" />
      <el-popover placement="bottom-end" width="150" trigger="click" popper-class="checkboxPopover">
        <template #reference>
          <el-button size="small" icon="el-icon-s-grid"></el-button>
        </template>

        <el-checkbox v-model="allColumnsSelected" :indeterminate="allColumnsSelectedIndeterminate"
          @change="handleCheckAllChange">
          全选
        </el-checkbox>
        <el-checkbox v-for="item in storeColumns" :key="item.property" v-model="item.show"
          @change="handleCheckedTableColumnsChange(item)">
          {{ item.label }}
        </el-checkbox>
      </el-popover>
    </el-button-group>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, unref, nextTick, PropType } from 'vue'
import { CrudProps, AuthProps, ELTableInstance } from './types/crudProps';

import { ElMessageBox } from 'element-plus'

type ColumnsObj = { show: boolean, [key: string]: any }
interface State {
  allColumnsSelected: boolean
  allColumnsSelectedIndeterminate: boolean
  storeColumns: ColumnsObj[],
  table: ELTableInstance | null | undefined
}
export default {
  props: {
    crud: {
      type: Object as PropType<CrudProps>,
      default: () => { return {} }
    },
    auth: {
      type: Object as PropType<AuthProps>,
      required: true
    }
  },
  setup(props: { crud: CrudProps; auth: AuthProps }) {
    const crud = props.crud;
    const state = reactive<State>({
      allColumnsSelected: true,
      allColumnsSelectedIndeterminate: false,
      storeColumns: [],
      table: null
    })
    let store: any
    nextTick(async () => {
      // console.log(inject('tableRef'))
      // state.table = await crud.getTable()
      state.table = crud.tableRef;
      store = state.table?.store
      const array = unref(store?.states?._columns)

      if (array && array.length) {
        state.storeColumns = array.map(i => {
          i.show = true;
          return i
        })
        // 删除 全选项
        state.storeColumns.shift()
        //删除 操作项
        state.storeColumns.pop()
      }
    })


    const handleCheckAllChange = (value: boolean) => {
      if (!value) {
        state.allColumnsSelected = true;
        return;
      }
      state.storeColumns.forEach(i => {
        if (!i.show) {
          i.show = value;
          changeColumns(i)
        }
      })
      state.allColumnsSelected = value;
      state.allColumnsSelectedIndeterminate = false;
    }

    const handleCheckedTableColumnsChange = (item: ColumnsObj) => {
      let totalCount = 0
      let selectedCount = 0
      state.storeColumns.forEach(item => {
        ++totalCount;
        selectedCount += item.show ? 1 : 0
      })
      if (selectedCount === 0) {
        crud.notify('请至少选择一列', crud.NOTIFICATION_TYPE.WARNING)
        nextTick(() => {
          item.show = true
        })
        return
      }
      state.allColumnsSelected = selectedCount === totalCount;
      state.allColumnsSelectedIndeterminate = selectedCount !== totalCount && selectedCount !== 0
      changeColumns(item)
    }


    const changeColumns = (item: ColumnsObj) => {
      if (!item.show) {
        store.commit('removeColumn', item, null)
        store.updateColumns();
      } else {
        store.commit('insertColumn', item, null)
        store.updateColumns();
      }
    }

    const toDelete = (datas: any[]) => {
      console.log(datas)
      ElMessageBox.confirm(`确认删除选中的${datas.length}条数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        crud.delAllLoading = true
        crud.doDelete(datas)
      }).catch(() => {
      })
    }
    return {
      ...toRefs(state),
      handleCheckAllChange,
      handleCheckedTableColumnsChange,
      toDelete
    }
  }
}
</script>
<style lang="less">
.checkboxPopover {
  // width: 150px;
  display: flex;
  flex-direction: column;
}
</style>
<style lang="less" scoped>
.crud-opts {
  padding: 4px 0;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

:deep(.el-button) {
  padding: 0 10px !important;
  min-height: 25px;
  box-sizing: border-box;
}

.crud-opts .crud-opts-right {
  margin-left: auto;
}

.crud-opts .crud-opts-right span {
  float: left;
}
</style>
