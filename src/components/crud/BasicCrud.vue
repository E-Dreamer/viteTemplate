<!--
 * @Author: E-Dreamer
 * @Date: 2022-07-05 09:56:49
 * @LastEditTime: 2022-07-08 10:49:37
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div class="wrapper">
    <!-- 搜索栏 -->
    <div class="header-container" v-if="crud.searchToggle">
      <el-form :inline="true" :model="crud.query">
        <el-row>
          <el-col v-for="item in searchForm" :key="item.field" :span="item?.colProps?.span || 6">
            <el-form-item :label="item.label">
              <slot v-if="item.slotProps" :name="item.slotProps" :query="crud.query"></slot>
              <component v-else :is="'action' + item.component" :action="item" :searchInfo="crud.query"></component>
            </el-form-item>
          </el-col>
          <el-form-item>
            <el-button size="small" type="primary" @click="crud.toQuery">查询</el-button>
            <el-button v-if="crud.optShow.reset" size="small" type="warning" @click="crud.resetQuery">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="table-container">
      <slot name="toolbar"></slot>
      <!-- fill -->
      <el-table ref="table" :data="crud.data" v-bind="tableAttr?.table" v-loading="crud.loading"
        @selection-change="crud.selectionChange">
        <el-table-column type="selection" width="55" v-bind="tableAttr.selection" />
        <el-table-column v-for="el in tableColumn" v-bind="el?.columnProps" :key="el.prop" :prop="el.prop"
          :label="el.label">
          <template #default="{ row, column, $index }" v-if="el.slotProps">
            <slot :name="el.prop" :scope="{ row, column, $index }"></slot>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120" prop="operation" v-bind="tableAttr?.operation || {}">
          <template #default="scope">
            <slot name="operation" :scope="scope"></slot>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination v-model:currentPage="crud.page.page" v-model:page-size="crud.page.size"
        :page-sizes="[10, 20, 30, 40]" small layout="total,prev, pager, next,sizes" :total="crud.page.total"
        @size-change="crud.sizeChangeHandler($event)" @current-change="crud.pageChangeHandler">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, Ref, reactive, onMounted, onActivated, PropType } from 'vue'
import action from '@/components/global/index'
import { CrudProps,ELTableInstance } from './types/crudProps'
import { Action } from '../global/types/action'
import { tableAttr, tableColumn } from './types/tableAttr'
interface searchForm extends Action {
  [key: string]: any
}
export default {
  components: { ...action },
  props: {
    crud: {
      type: Object as PropType<CrudProps>,
      default: () => {
        return {}
      },
      require: true,
    },
    searchForm: {
      type: Array as PropType<searchForm[]>,
      default: () => {
        return []
      },
      require: true,
    },
    tableAttr: {
      type: Object as PropType<tableAttr>,
      default: () => {
        return {}
      },
    },
    tableColumn: {
      type: Array as PropType<tableColumn[]>,
      default: () => {
        return []
      },
      require: true,
    }
  },
  setup(props) {
    const state = reactive({
      table: null as ELTableInstance | null | undefined
    })

    onMounted(() => {
      props.crud.tableRef = state.table
      // const dom = document.getElementsByClassName('el-pagination__total')
      // if (dom && dom.length) {
      //   console.log('进来？？')
      //   dom[0].innerHTML = dom[0].innerHTML.replace('Total', '总计')
      // }

      // const jumpDom = document.getElementsByClassName('el-pagination__jump')
      // if (jumpDom && jumpDom.length) {
      //   jumpDom[0].innerHTML = jumpDom[0].innerHTML.replace('Go to', '跳转')
      // }
    })

    onActivated(() => {
      //对 Table 进行重新布局。 当表格可见性变化时，您可能需要调用此方法以获得正确的布局
      state.table?.doLayout()
    })

    return {
      ...toRefs(state)
    }
  },
}
</script>
<style lang="less" scoped>
:deep(.el-form-item__content) {
  display: flex;
  align-items: center;
}

.wrapper {
  padding: 10px;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 84px);
}

.header-container {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 20px;
}

.table-container {
  width: 100%;
  background-color: #fff;
  padding: 10px;
  flex: 1;
}

.pagination {
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;

  >span {
    font-size: 12px;

  }
}
</style>
