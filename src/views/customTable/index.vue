<!--
 * @Author: E-Dreamer
 * @Date: 2022-07-01 15:34:04
 * @LastEditTime: 2022-07-06 15:13:16
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <BasicCrud :crud="crud" :searchForm="searchForm" :tableAttr="tableAttr" :tableColumn="tableColumn">
    <template #name="{ query }">
      <el-rate v-model="query.rate" />
    </template>

    <template #toolbar>
      <CrudOperation :crud="crud"></CrudOperation>
    </template>

    <template #address="{ scope }">
      {{ scope.row.address }}
    </template>
  </BasicCrud>

  <el-form ref="getForm">

  </el-form>
</template>

<script>
import { reactive, toRefs } from 'vue'
//crudOperation
import { useCrud, BasicCrud, CrudOperation } from '@/components/crud/index.js'
export default {
  components: { BasicCrud, CrudOperation },
  setup () {

    const state = reactive({
      count: 0,
      getForm: null,
      form: {
        name: '',
        age: null,
      },
      searchForm: [
        {
          field: 'roleNme',
          label: '角色名称',
          component: 'input',
          componentProps: {
            placeholder: '请输入角色',
            disabled: false,
          }
        },
        {
          field: 'count',
          label: '数字',
          component: 'input',
          subType: 'number',
          componentProps: {
            placeholder: '请输入数字',
            disabled: false
          }
        },
        {
          field: 'name',
          label: '姓名',
          slotProps: 'name'
        }
      ]
    })
    const add = () => {
      console.log('新增接口')
    }
    const edit = () => {
      console.log('修改接口')
    }
    const del = () => {
      console.log('删除接口')
    }
    state.crud = useCrud({
      title: '这是标题',
      url: '/list',
      sort: 'id,desc',
      crudMethod: { add, edit, del },
      form: state.form,
      query: { className: '啦啦啦' },
      HOOK: {},
      getForm: () => { state.getForm }
    })

    // state.crud.HOOK.beforeToEdit = (crud, form) => {
    //   state.count++
    //   return true
    // }


    const change = () => {
      // state.searchForm[0].componentProps.disabled = !state.searchForm[0].componentProps.disabled;
      // console.log(state.searchForm[0])
    }

    // table的
    const tableAttr = {
      table: {
        'stripe': true,
        'border': true,
        'show-header': true,
        'highlight-current-row': true
      },
      //全选栏的 props
      selection: {

      },
      //操作栏的props
      operation: {}
    }

    const tableColumn = [
      {
        label: 'id',
        prop: 'id'
      },
      {
        label: '姓名',
        prop: 'name'
      },
      {
        label: '地址',
        prop: 'address',
        slotProps: true
      }
    ]
    return {
      ...toRefs(state),
      // crud,
      tableAttr,
      change,
      tableColumn
    }
  },
}
</script>
