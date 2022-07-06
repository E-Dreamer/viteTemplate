/*
 * @Author: E-Dreamer
 * @Date: 2022-07-01 15:49:44
 * @LastEditTime: 2022-07-06 15:04:00
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { nextTick, reactive, isRef, toRefs, computed } from 'vue'

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
  beforeRefresh: true,
  /** 刷新 - 之后 */
  afterRefresh: true,
  /** 点击删除 - 之前 */
  beforeClickDelete: true,
  /** 删除 - 之前 */
  beforeDelete: true,
  /** 删除 - 之后 */
  afterDelete: true,
  /** 删除取消 - 之前 */
  beforeDeleteCancel: true,
  /** 删除取消 - 之后 */
  afterDeleteCancel: true,
  /** 新建 - 之前 */
  beforeToAdd: true,
  /** 新建 - 之后 */
  afterToAdd: true,
  /** 编辑 - 之前 */
  beforeToEdit: true,
  /** 编辑 - 之后 */
  afterToEdit: true,
  /** 开始 "新建/编辑" - 之前 */
  beforeToCU: true,
  /** 开始 "新建/编辑" - 之后 */
  afterToCU: true,
  /** "新建/编辑" 验证 - 之前 */
  beforeValidateCU: true,
  /** "新建/编辑" 验证 - 之后 */
  afterValidateCU: true,
  /** 添加取消 - 之前 */
  beforeAddCancel: true,
  /** 添加取消 - 之后 */
  afterAddCancel: true,
  /** 编辑取消 - 之前 */
  beforeEditCancel: true,
  /** 编辑取消 - 之后 */
  afterEditCancel: true,
  /** 提交 - 之前 */
  beforeSubmit: true,
  /** 提交 - 之后 */
  afterSubmit: true,
  afterAddError: true,
  afterEditError: true,
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
    defaultForm: () => {},
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
    optShow: {
      add: true,
      edit: true,
      del: true,
      download: true,
      reset: true,
    },
    HOOK,
    table: null,
    searchToggle: true,
    NOTIFICATION_TYPE,
    getForm:null
  }
  // tableProps = mergeOptions(defaultOptions, tableProps)
  tableProps = Object.assign(defaultOptions, tableProps)

  tableProps.defaultQuery = JSON.parse(JSON.stringify(tableProps.query))

  const state = reactive(tableProps)

  state.status = {
    add: STATUS.NORMAL,
    edit: STATUS.NORMAL,
    // 添加或编辑状态
    get cu() {
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
    },
    // 标题
    get title() {
      return state.status.add > STATUS.NORMAL
        ? `新增${state.title}`
        : state.status.edit > STATUS.NORMAL
        ? `编辑${state.title}`
        : state.title
    },
  }
  return state
}

export function useCrud(tableProps) {
  let crud = CRUD(tableProps)
  // 得到table ref
  const getTable = async () => {
    if (!crud.currentTable) return null
    let res = await crud.currentTable()
    return isRef(res) ? res.value : res
  }

  // hook 初始化时取不到
  const findHook = (name) => {
    return nextTick(() => {
      return crud.HOOK[name]
    })
  }

  //是否是函数
  const isFn = (result) => {
    return Object.prototype.toString.call(result) === '[object,Function]'
  }

  //通知
  const notify = (message, type = crud.NOTIFICATION_TYPE.INFO) => {
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
  const getQueryParams = () => {
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
  const refresh = async () => {
    const res = await findHook('beforeRefresh')
    if (isFn(res) && !res(crud, crud.form)) {
      return
    }
    console.log(getQueryParams())
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
  const resetQuery = (flag = true) => {
    const defaultQuery = JSON.parse(JSON.stringify(crud.defaultQuery))
    const query = crud.query
    Object.keys(query).forEach((key) => {
      query[key] = defaultQuery[key]
    })
    // 重置参数
    crud.params = {}
    if (flag) {
      toQuery()
    }
  }
  /**
   * @description: 查询
   * @return {*}
   */
  const toQuery = () => {
    crud.page.page = 1
    refresh()
  }

  //
  /**
   * @description: 每页条数改变
   * @param {*} e 条数值
   * @return {*}
   */
  const sizeChangeHandler = (e) => {
    console.log('e: ', e)
    crud.page.size = e
    crud.page.page = 1
    refresh()
  }

  /**
   * @description: 当前页改变
   * @param {*} e 页码值
   * @return {*}
   */
  const pageChangeHandler = (e) => {
    crud.page.page = e
    refresh()
  }

  toQuery()

  /**
   * @description: 筛选栏显示隐藏
   * @return {*}
   */
  const toggleChange = () => {
    crud.searchToggle = !crud.searchToggle
  }

  /**
   * @description:table 勾选改变
   * @return {*} 勾选列表
   */
  const selectionChange = (val) => {
    crud.selections = val
    console.log('crud.selections: ', crud.selections)
  }

  /**
   * @description: 新增
   * @return {*} 传递form的ref
   */
  const toAdd = () => {}

  /**
   * @description: 重置表单
   * @return {*}
   */
  const resetForm = () => {}


  /**
   * @description: 修改 
   * @return {*}
   */  
  const toEdit = ()=>{

  }


  return {
    ...toRefs(crud),
    toQuery,
    refresh,
    notify,
    getTable,
    resetQuery,
    sizeChangeHandler,
    pageChangeHandler,
    toggleChange,
    selectionChange,
  }
}
