/*
 * @Author: E-Dreamer
 * @Date: 2022-07-01 15:49:44
 * @LastEditTime: 2022-07-07 11:08:10
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { reactive, isRef, onMounted, computed, unref } from 'vue'
import { deepClone } from '@/utils/utils.js'
import { ElMessage } from 'element-plus'
// function mergeOptions(src, opts) {
//   const optsRet = {
//     ...src,
//   }
//   for (const key in src) {
//     if (opts.hasOwnProperty(key)) {
//       optsRet[key] = opts[key]
//     }
//   }
//   return optsRet
// }
const HOOK = {
  /** 刷新 - 之前 */
  beforeRefresh: null,
  /** 刷新 - 之后 */
  afterRefresh: null,
  /** 点击删除 - 之前 */
  beforeClickDelete: null,
  /** 删除 - 之前 */
  beforeDelete: null,
  /** 删除 - 之后 */
  afterDelete: null,
  /** 删除取消 - 之前 */
  beforeDeleteCancel: null,
  /** 删除取消 - 之后 */
  afterDeleteCancel: null,
  /** 新建 - 之前 */
  beforeToAdd: null,
  /** 新建 - 之后 */
  afterToAdd: null,
  /** 编辑 - 之前 */
  beforeToEdit: null,
  /** 编辑 - 之后 */
  afterToEdit: null,
  /** 开始 "新建/编辑" - 之前 */
  beforeToCU: null,
  /** 开始 "新建/编辑" - 之后 */
  afterToCU: null,
  /** "新建/编辑" 验证 - 之前 */
  beforeValidateCU: null,
  /** "新建/编辑" 验证 - 之后 */
  afterValidateCU: null,
  /** 添加取消 - 之前 */
  beforeAddCancel: null,
  /** 添加取消 - 之后 */
  afterAddCancel: null,
  /** 编辑取消 - 之前 */
  beforeEditCancel: null,
  /** 编辑取消 - 之后 */
  afterEditCancel: null,
  /** 提交 - 之前 */
  beforeSubmit: null,
  /** 提交 - 之后 */
  afterSubmit: null,
  afterAddError: null,
  afterEditError: null,
}
//信息
const msg = {
  submit: '提交成功',
  add: '新增成功',
  edit: '编辑成功',
  del: '删除成功',
}
// 状态
const STATUS = {
  NORMAL: 0,
  PREPARED: 1,
  PROCESSING: 2,
}
// 通知类型
const NOTIFICATION_TYPE = {
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
  ERROR: 'error',
}
/**
 * @description: CRUD配置
 * @param {*} tableProps
 * @return {*}crud instance.
 */
function CRUD(tableProps) {
  //默认参数
  const defaultOptions = {
    // id字段名
    idField: 'id',
    // 标题
    title: '',
    // 请求数据的url
    url: '',
    // 表格数据
    data: [],
    // 选择项
    selections: [],
    // 待查询的对象
    query: {},
    // 查询数据的参数
    params: {},
    // Form 表单
    form: {},
    // 重置表单
    defaultForm: {},
    // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
    sort: ['id,desc'],
    page: {
      // 页码
      page: 0,
      // 每页数据条数
      size: 10,
      // 总数据条数
      total: 0,
    },
    // 整体loading
    loading: false,
    // 导出的 Loading
    downloadLoading: false,
    // 删除的 Loading
    delAllLoading: false,
    // CRUD Method
    crudMethod: {
      add: (form) => {},
      del: (id) => {},
      edit: (form) => {},
      get: (id) => {},
    },
    //按钮权限
    auth: null,
    optShow: {
      add: true,
      edit: true,
      del: true,
      download: true,
      reset: true,
    },
    HOOK,
    tableRef: null,
    formRef: null,
    searchToggle: true,
    NOTIFICATION_TYPE,
  }
  // tableProps = mergeOptions(defaultOptions, tableProps)
  tableProps = Object.assign(defaultOptions, tableProps)

  tableProps.defaultQuery = JSON.parse(JSON.stringify(tableProps.query))

  const state = reactive(tableProps)
  state.defaultForm = deepClone(state.form)
  state.status = {
    add: STATUS.NORMAL,
    edit: STATUS.NORMAL,
    // 添加或编辑状态
    cu: computed(() => {
      if (
        state.status.add === STATUS.NORMAL &&
        state.status.edit === STATUS.NORMAL
      ) {
        return STATUS.NORMAL
      } else if (
        state.status.add === STATUS.PREPARED ||
        state.status.edit === STATUS.PREPARED
      ) {
        return STATUS.PREPARED
      } else if (
        state.status.add === STATUS.PROCESSING ||
        state.status.edit === STATUS.PROCESSING
      ) {
        return STATUS.PROCESSING
      }
      throw new Error("wrong crud's cu status")
    }),
    // 标题
    title: computed(() => {
      return state.status.add > STATUS.NORMAL
        ? `新增${state.title}`
        : state.status.edit > STATUS.NORMAL
        ? `编辑${state.title}`
        : state.title
    }),
    dialog: computed({
      get: () => {
        return state.status.cu > 0
      },
      set: (val) => {
        // console.log(val)
        return true
      },
    }),
  }
  return state
}

export function useCrud(tableProps) {
  let crud = CRUD(tableProps)
  console.log('crud: ', crud)
  // 得到table ref
  // 传递是 crud.currentTable = ()=>{return nextTick(()=>return ref)}
  const getTable = async () => {
    if (!crud.currentTable) return null
    let res = await crud.currentTable()
    return isRef(res) ? res.value : res
  }

  // // hook 初始化时取不到
  const findHook = (name) => {
    if (isFn(crud.HOOK[name])) {
      return crud.HOOK[name](crud, crud.form)
    } else {
      const fn = () => {
        return true
      }
      return fn()
    }
  }

  //是否是函数
  const isFn = (result) => {
    return Object.prototype.toString.call(result) === '[object,Function]'
  }

  //通知
  crud.notify = (message, type = crud.NOTIFICATION_TYPE.INFO) => {
    ElMessage({
      message,
      type,
      duration: 2500,
    })
  }
  /**
   * 通用的提示
   */
  const submitSuccessNotify = () => {
    notify(msg.submit, crud.NOTIFICATION_TYPE.SUCCESS)
  }
  const addSuccessNotify = () => {
    notify(msg.add, crud.NOTIFICATION_TYPE.SUCCESS)
  }
  const editSuccessNotify = () => {
    notify(msg.edit, crud.NOTIFICATION_TYPE.SUCCESS)
  }
  const delSuccessNotify = () => {
    notify(msg.del, crud.NOTIFICATION_TYPE.SUCCESS)
  }

  /**
   * @description: 获取查询参数
   * @return {*}
   */
  crud.getQueryParams = () => {
    Object.keys(crud.query).length !== 0 &&
      Object.keys(crud.query).forEach((item) => {
        if (crud.query[item] === null || crud.query[item] === '')
          crud.query[item] = undefined
      })
    Object.keys(crud.params).length !== 0 &&
      Object.keys(crud.params).forEach((item) => {
        if (crud.params[item] === null || crud.params[item] === '')
          crud.params[item] = undefined
      })
    return {
      page: crud.page.page - 1,
      size: crud.page.size,
      sort: crud.sort,
      ...crud.query,
      ...crud.params,
    }
  }

  /**
   * @description: 刷新
   * @return {*}
   */
  crud.refresh = async () => {
    if (!findHook('beforeRefresh')) {
      return
    }
    console.log(crud.getQueryParams())
    crud.loading = true
    crud.data.push({
      id: crud.data.length + 1,
      name: `张三${crud.data.length + 1}`,
      address: '北京',
    })
    crud.page.total = crud.data.length
    crud.loading = false
  }
  /**
   * @description: 重置查询参数
   * @param {*} flag 重置后进行查询操作
   * @return {*}
   */
  crud.resetQuery = (flag = true) => {
    const defaultQuery = JSON.parse(JSON.stringify(crud.defaultQuery))
    const query = crud.query
    Object.keys(query).forEach((key) => {
      query[key] = defaultQuery[key]
    })
    // 重置参数
    crud.params = {}
    if (flag) {
      crud.toQuery()
    }
  }
  /**
   * @description: 查询
   * @return {*}
   */
  crud.toQuery = () => {
    crud.page.page = 1
    crud.refresh()
  }

  //
  /**
   * @description: 每页条数改变
   * @param {*} e 条数值
   * @return {*}
   */
  crud.sizeChangeHandler = (e) => {
    crud.page.size = e
    crud.page.page = 1
    crud.refresh()
  }

  /**
   * @description: 当前页改变
   * @param {*} e 页码值
   * @return {*}
   */
  crud.pageChangeHandler = (e) => {
    crud.page.page = e
    crud.refresh()
  }

  onMounted(() => {
    crud.toQuery()
  })

  /**
   * @description: 筛选栏显示隐藏
   * @return {*}
   */
  crud.toggleChange = () => {
    crud.searchToggle = !crud.searchToggle
  }

  /**
   * @description:table 勾选改变
   * @return {*} 勾选列表
   */
  crud.selectionChange = (val) => {
    crud.selections = val
    console.log('crud.selections: ', crud.selections)
  }

  /**
   * @description: 新增
   * @return {*} 传递form的ref
   */
  crud.toAdd = async () => {
    crud.resetForm()
    if (!findHook('beforeToAdd') && findHook('beforeToCU')) {
      return
    }
    crud.status.add = STATUS.PREPARED
    findHook('afterToAdd')
    findHook('afterToCU')
  }

  /**
   * @description: 重置表单
   * @return {*}
   */
  crud.resetForm = () => {
    const form = crud.defaultForm
    const crudFrom = crud.form
    for (let key in form) {
      // if (crudFrom.hasOwnProperty(key)) {
      //   crudFrom[key] = form[key]
      // }
      crudFrom[key] = form[key]
    }
    //表单清空函数 resetFields
    if (crud.formRef()) {
      crud.formRef().clearValidate()
    }
  }

  /**
   * @description: 修改
   * @return {*}
   */
  crud.toEdit = async () => {
    crud.resetForm()
    if (!(findHook('beforeToAdd') && findHook('beforeToCU'))) {
      return
    }
    crud.status.edit = STATUS.PREPARED
    findHook('afterToEdit')
    findHook('afterToCU')
  }

  /**
   * @description: 取消 新增/编辑
   * @return {*}
   */
  crud.cancelCU = async () => {
    const addStatus = crud.status.add
    const editStatus = crud.status.edit
    if (addStatus === STATUS.PREPARED) {
      if (!findHook('beforeAddCancel')) {
        return
      }
      crud.status.add = STATUS.NORMAL
    }
    if (editStatus === STATUS.PREPARED) {
      if (!findHook('beforeEditCancel')) {
        return
      }
      crud.status.edit = STATUS.NORMAL
      // crud.getDataStatus(crud.getDataId(crud.form)).edit = STATUS.NORMAL
    }
    crud.resetForm()
    if (addStatus === STATUS.PREPARED) {
      findHook('afterAddCancel')
    }
    if (editStatus === STATUS.PREPARED) {
      findHook('afterEditCancel')
    }
    // 清除表单验证
    if (crud.formRef()) {
      crud.formRef().clearValidate()
    }
  }

  /**
   * @description: 删除
   * @param {*} data 需要删除的项
   * @return {*}
   */
  crud.toDelete = async (data) => {}

  /**
   * @description: 
   * @param {*} data
   * @return {*}
   */  
  crud.doDelete = async(data)=>{

  }
  /**
   * @description: 
   * @param {*} data
   * @return {*}
   */  
  crud.cancelDelete = async(data)=>{

  }

  /**
   * @description: 
   * @param {*} data
   * @return {*}
   */  
  crud.beforeClickDelete = async(data)=>{

  }
  /**
   * @description: 导出方法
   * @return {*}
   */
  crud.doExport = () => {}
  return crud
}
