<!--
 * @Author: E-Dreamer
 * @Date: 2022-07-01 15:34:04
 * @LastEditTime: 2022-07-08 15:07:42
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>
    <BasicCrud :crud="crud" :searchForm="searchForm" :tableAttr="tableAttr" :tableColumn="tableColumn">
      <!-- 自定义插槽 -->
      <template #name="{ query }">
        <el-rate v-model="query.rate" />
      </template>
      <template #address="{ scope }">
        {{ scope.row.address }}
      </template>
      <!-- 菜单栏 -->
      <template #toolbar>
        <CrudOperation :crud="crud" :auth="auth"></CrudOperation>
      </template>
      <!-- 操作栏 -->
      <template #operation="{ scope }">
        <RROperation :crud="crud" :data="scope.row" :auth="auth"></RROperation>
      </template>
    </BasicCrud>
    <el-dialog ref="dialog" :close-on-click-modal="false" :before-close="crud.cancelCU" v-model="crud.status.dialog"
      :title="crud.status.title" width="700px">
      <el-form ref="getForm" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
        <el-form-item label="Activity name" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Activity zone" prop="age">
          <el-select v-model="form.age" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="text" @click="crud.cancelCU">取消</el-button>
      <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
    </el-dialog>
  </div>


</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
//crudOperation
import { useCrud, BasicCrud, CrudOperation, RROperation } from '@/components/crud/index'
import { resolve } from 'path/posix'

export default {
  components: { BasicCrud, CrudOperation, RROperation },
  setup() {

    const state = reactive({
      count: 0,
      getForm: null,
      dialog: null,
      form: {
        name: '',
        age: null,
      },
      auth: {
        add: ['courseVideo:add'],
        edit: ['admin', 'courseVideo:edit'],
        del: ['admin', 'courseVideo:del'],
        download: ['admin', 'courseVideo:download']
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input name',
            trigger: 'blur',
          },
        ],
        age: [
          {
            required: true,
            message: 'Please select Activity count',
            trigger: 'change',
          },
        ]
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
      return new Promise((resolve) => {
        resolve('新增接口')
      })
    }
    const edit = () => {
      return new Promise((resolve) => {
        resolve('修改接口')
      })
    }
    const del = () => {
      return new Promise((resolve) => {
        resolve('删除接口')
      })
    }


    const crud = useCrud({
      title: '这是标题',
      url: '/list',
      sort: 'id,desc',
      crudMethod: { add, edit, del },
      form: state.form,
      query: { className: '啦啦啦' },
      formRef: () => { return state.getForm }
    })
    // HOOK 可在外配置 也可以直接写入useCrud中
    crud.HOOK.beforeToAdd = (crud, form) => {
      console.log('return toadd')
      return true;
    }
    crud.HOOK.beforeRefresh = (crud, form) => {
      return true
    }

    // onMounted(() => {
    //   // 给crud.formRef赋值
    //   crud.formRef = state.getForm
    // })

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
        'highlight-current-row': true,
        // onSelectionChange:crud.selectAllChange
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
      crud,
      tableAttr,
      change,
      tableColumn
    }
  },
}
</script>
