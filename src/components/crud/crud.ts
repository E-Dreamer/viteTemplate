/*
 * @Author: E-Dreamer
 * @Date: 2022-07-01 15:49:44
 * @LastEditTime: 2022-07-08 14:39:47
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { reactive, isRef, onMounted, computed } from 'vue'
import { deepClone } from '@/utils/utils.js'
import { ElMessage } from 'element-plus'
import {
  CrudProps,
  NOTIFICATION_TYPE_PROPS,
  HookProps,
} from './types/crudProps'
function mergeOptions(src: object, opts: object) {
  const optsRet = {
    ...src,
  }
  for (const key in src) {
    if (opts.hasOwnProperty(key)) {
      optsRet[key] = opts[key]
    }
  }
  return optsRet
}
//是否是函数
const isFn = (result: object) => {
  return Object.prototype.toString.call(result) === '[object Function]'
}
function initData(url: string, params: object) {
  // return request({
  //   url: url + '?' + qs.stringify(params, { indices: false }),
  //   method: 'get'
  // })
  return new Promise((resolve, reject) => {
    resolve({ url, params })

    reject('报错了')
  })
}
const HOOK: HookProps = {
  /** 刷新 - 之前 */
  beforeRefresh: undefined,
  /** 刷新 - 之后 */
  afterRefresh: undefined,
  /** 点击删除 - 之前 */
  beforeClickDelete: undefined,
  /** 删除 - 之前 */
  beforeDelete: undefined,
  /** 删除 - 之后 */
  afterDelete: undefined,
  /** 删除取消 - 之前 */
  beforeDeleteCancel: undefined,
  /** 删除取消 - 之后 */
  afterDeleteCancel: undefined,
  /** 新建 - 之前 */
  beforeToAdd: undefined,
  /** 新建 - 之后 */
  afterToAdd: undefined,
  /** 编辑 - 之前 */
  beforeToEdit: undefined,
  /** 编辑 - 之后 */
  afterToEdit: undefined,
  /** 开始 "新建/编辑" - 之前 */
  beforeToCU: undefined,
  /** 开始 "新建/编辑" - 之后 */
  afterToCU: undefined,
  /** "新建/编辑" 验证 - 之前 */
  beforeValidateCU: undefined,
  /** "新建/编辑" 验证 - 之后 */
  afterValidateCU: undefined,
  /** 添加取消 - 之前 */
  beforeAddCancel: undefined,
  /** 添加取消 - 之后 */
  afterAddCancel: undefined,
  /** 编辑取消 - 之前 */
  beforeEditCancel: undefined,
  /** 编辑取消 - 之后 */
  afterEditCancel: undefined,
  /** 提交 - 之前 */
  beforeSubmit: undefined,
  /** 提交 - 之后 */
  afterSubmit: undefined,
  afterAddError: undefined,
  afterEditError: undefined,
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
const NOTIFICATION_TYPE: NOTIFICATION_TYPE_PROPS = {
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
function CRUD(tableProps: CrudProps) {
  //默认参数
  const defaultOptions = {
    idField: 'id',
    title: '',
    url: '',
    data: [],
    selections: [],
    query: {},
    params: {},
    form: {},
    defaultForm: {},
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
      add: () => {},
      del: () => {},
      edit: () => {},
      get: () => {},
    },
    optShow: {
      add: true,
      edit: true,
      del: true,
      download: true,
      reset: true,
    },
    HOOK,
    tableRef: undefined,
    formRef: undefined,
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
        return state.status?.cu > 0
      },
      set: (val) => {
        // console.log(val)
        return true
      },
    }),
  }
  return state
}

export function useCrud(tableProps: CrudProps): CrudProps {
  let crud = CRUD(tableProps)
  console.log('crud: ', crud)

  /**
   * @description: 获取到hook的函数
   * @param {string} name hook对象中的名称
   * @param {*} first 第一个参数
   * @param {*} seconed 第二个参数
   * @return {*}
   */
  const findHook = (
    name: string,
    first: any = crud,
    second: any = crud.form
  ) => {
    if (isFn(crud.HOOK[name])) {
      return crud.HOOK[name](first, second)
    }
    return true
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
    crud.notify(msg.submit, crud.NOTIFICATION_TYPE.SUCCESS)
  }
  const addSuccessNotify = () => {
    crud.notify(msg.add, crud.NOTIFICATION_TYPE.SUCCESS)
  }
  const editSuccessNotify = () => {
    crud.notify(msg.edit, crud.NOTIFICATION_TYPE.SUCCESS)
  }
  const delSuccessNotify = () => {
    crud.notify(msg.del, crud.NOTIFICATION_TYPE.SUCCESS)
  }

  /**
   * @description: 获取查询参数
   * @return {*}
   */
  crud.getQueryParams = () => {
    Object.keys(crud.query as object).length !== 0 &&
      Object.keys(crud.query as object).forEach((item) => {
        if (crud.query[item] === null || crud.query[item] === '')
          crud.query[item] = undefined
      })
    Object.keys(crud.params as object).length !== 0 &&
      Object.keys(crud.params as object).forEach((item) => {
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
  crud.refresh = () => {
    if (!findHook('beforeRefresh')) {
      return
    }
    console.log(crud.getQueryParams())
    //模拟数据
    crud.data.push({
      id: crud.data.length + 1,
      name: `张三${crud.data.length + 1}`,
      address: '北京',
    })
    crud.page.total = crud.data.length

    // return new Promise((resolve, reject) => {
    //   crud.loading = true
    //   initData(crud.url, crud.getQueryParams())
    //     .then((data: any) => {
    //       crud.page.total = data.totalElements
    //       // crud.data = data.content
    //       crud.resetDataStatus()
    //       crud.loading = false
    //       findHook('afterRefresh')
    //       resolve(data)
    //     })
    //     .catch((err) => {
    //       crud.loading = false
    //       reject(err)
    //     })
    // })
  }
  /**
   * @description: 重置查询参数
   * @param {*} flag 重置后进行查询操作
   * @return {*}
   */
  crud.resetQuery = (flag = true) => {
    const defaultQuery = JSON.parse(JSON.stringify(crud.defaultQuery))
    const query = crud.query
    Object.keys(query as object).forEach((key) => {
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
  }

  /**
   * @description: 新增
   * @return {*} 传递form的ref
   */
  crud.toAdd = () => {
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
    crud.formRef()?.clearValidate()
  }

  /**
   * @description: 修改
   * @return {*}
   */
  crud.toEdit = () => {
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
  crud.cancelCU = () => {
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
      crud.getDataStatus(crud.getDataId(crud.form)).edit = STATUS.NORMAL
    }
    crud.resetForm()
    if (addStatus === STATUS.PREPARED) {
      findHook('afterAddCancel')
    }
    if (editStatus === STATUS.PREPARED) {
      findHook('afterEditCancel')
    }
    // 清除表单验证
    crud.formRef()?.clearValidate()
  }

  /**
   * @description: 提交新增/编辑
   * @param {*} flag 控制是否关闭弹窗
   * @return {*}
   */
  crud.submitCU = (flag) => {
    if (!findHook('beforeValidateCU')) {
      return
    }
    Object.keys(crud.form).forEach((i) => {
      if (typeof crud.form[i] === 'string') {
        crud.form[i] = crud.form[i].trim()
      }
    })
    crud.formRef()?.validate((valid) => {
      if (!valid) {
        return
      }
      if (!findHook('afterValidateCU')) {
        return
      }
      if (crud.status.add === STATUS.PREPARED) {
        flag ? crud.doAdd() : crud.doAddNoClose()
      } else if (crud.status.edit === STATUS.PREPARED) {
        crud.doEdit()
      }
    })
  }

  /**
   * @description: 执行添加
   * @return {*}
   */
  crud.doAdd = () => {
    if (!findHook('beforeSubmit')) {
      return
    }
    crud.status.add = STATUS.PROCESSING
    crud.crudMethod
      .add(crud.form)
      .then(() => {
        crud.status.add = STATUS.NORMAL
        crud.resetForm()
        addSuccessNotify()
        findHook('afterSubmit')
        crud.toQuery()
      })
      .catch(() => {
        crud.status.add = STATUS.PREPARED
        findHook('afterAddError')
      })
  }

  /**
   * @description:
   * @return {*}
   */
  crud.doAddNoClose = () => {
    if (!findHook('beforeSubmit')) {
      return
    }
    crud.status.add = STATUS.PROCESSING
    crud.crudMethod
      .add(crud.form)
      .then(() => {
        crud.status.add = STATUS.NORMAL
        addSuccessNotify()
        findHook('afterSubmit')
        crud.toQuery()
      })
      .catch(() => {
        crud.status.add = STATUS.PREPARED
        findHook('afterAddError')
      })
  }

  /**
   * @description: 执行编辑
   * @return {*}
   */
  crud.doEdit = () => {
    if (!findHook('beforeSubmit')) {
      return
    }
    crud.status.edit = STATUS.PROCESSING
    crud.crudMethod
      .edit(crud.form)
      .then((d:any) => {
        crud.status.edit = STATUS.NORMAL
        crud.getDataStatus(crud.getDataId(crud.form)).edit = STATUS.NORMAL
        editSuccessNotify()
        findHook('afterSubmit')
        crud.resetForm()
        crud.refresh()
      })
      .catch((e:any) => {
        crud.status.edit = STATUS.PREPARED
        findHook('afterEditError')
      })
  }
  /**
   * @description: 启动删除
   * @param {*} data 需要删除的项
   * @return {*}
   */
  crud.toDelete = (data) => {
    crud.getDataStatus(crud.getDataId(data)).delete = STATUS.PREPARED
  }

  /**
   * @description: 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
   * @param {*} size 页码
   * @return {*}
   */  
  crud.dleChangePage = (size)=> {
    if (crud.data.length === size && crud.page.page !== 1) {
      crud.page.page -= 1
    }
  },
  /**
   * @description:
   * @param {*} data 需要删除的项
   * @return {*}
   */
  crud.doDelete = (data) => {
    let deleteT: NodeJS.Timeout | null = null
    const setDeleteT = () => {
      deleteT = setTimeout(() => {
        clearTimeout(Number(deleteT))
        deleteT = null
      }, 500)
    }
    if (deleteT) {
      clearTimeout(Number(deleteT))
      setDeleteT()
      return ''
    }
    setDeleteT()
    let delAll: boolean = false
    let dataStatus: any;
    const ids = []
    if (data instanceof Array) {
      delAll = true
      data.forEach((val) => {
        ids.push(crud.getDataId(val))
      })
    } else {
      ids.push(crud.getDataId(data))
      dataStatus = crud.getDataStatus(crud.getDataId(data))
    }
    if (!findHook('beforeDelete', data)) {
      return
    }
    if (!delAll) {
      dataStatus.delete = STATUS.PROCESSING
    }
    return crud.crudMethod
      .del(ids)
      .then(() => {
        if (delAll) {
          crud.delAllLoading = false
        } else dataStatus.delete = STATUS.PREPARED
        crud.dleChangePage(1)
        delSuccessNotify()
        findHook('afterDelete', data)
        crud.refresh()
      })
      .catch(() => {
        if (delAll) {
          crud.delAllLoading = false
        } else dataStatus.delete = STATUS.PREPARED
      })
  }

  /**
   * @description: 重置数据状态
   * @return {*}
   */
  crud.resetDataStatus = () => {
    const dataStatus = {}
    function resetStatus(datas: any[]) {
      datas.forEach((e) => {
        dataStatus[crud.getDataId(e)] = {
          delete: 0,
          edit: 0,
        }
        if (e.children) {
          resetStatus(e.children)
        }
      })
    }
    resetStatus(crud.data)
    crud.dataStatus = dataStatus
  }

  /**
   * @description: 用于树形表格多选, 选中所有
   * @param {*} selection
   * @return {*}
   */
  crud.selectAllChange = (selection) => {
    // 如果选中的数目与请求到的数目相同就选中子节点，否则就清空选中
    if (selection && selection.length === crud.data.length) {
      selection.forEach((val) => {
        crud.selectChange(selection, val)
      })
    } else {
      crud.tableRef?.clearSelection()
    }
  }

  /**
   * @description: 用于树形表格多选, 选中所有
   * @param {*} selection
   * @param {*} row
   * @return {*}
   */
  crud.selectChange = (selection, row) => {
    // 如果selection中存在row代表是选中，否则是取消选中
    if (
      selection.find((val) => {
        return crud.getDataId(val) === crud.getDataId(row)
      })
    ) {
      if (row.children) {
        row.children.forEach((val) => {
          crud.tableRef?.toggleRowSelection(val, true)
          selection.push(val)
          if (val.children) {
            crud.selectChange(selection, val)
          }
        })
      }
    } else {
      crud.toggleRowSelection(selection, row)
    }
  }

  /**
   * @description: 切换选中状态
   * @param {*} selection
   * @param {*} data
   * @return {*}
   */
  crud.toggleRowSelection = (selection, data) => {
    if (data.children) {
      data.children.forEach((val: { children: any[]; [key: string]: any }) => {
        crud.tableRef?.toggleRowSelection(val, false)
        if (val.children) {
          crud.toggleRowSelection(selection, val)
        }
      })
    }
  }

  /**
   * @description: 获取数据id
   * @param {*} data crud.data
   * @return {*}
   */
  crud.getDataId = (data) => {
    return crud.idField && data[crud.idField]
  }

  /**
   * @description: 获取数据状态
   * @param {*} id 列表 id
   * @return {*}
   */
  crud.getDataStatus = (id) => {
    return crud.dataStatus[id]
  }
  /**
   * @description: 取消删除
   * @param {*} data 需要删除的项
   * @return {*}
   */
  crud.cancelDelete = (data) => {
    if (!findHook('beforeDeleteCancel')) {
      return
    }
    crud.getDataStatus(crud.getDataId(data)).delete = STATUS.NORMAL

    findHook('afterDeleteCancel', data)
  }

  /**
   * @description: 点击删除之前的操作
   * @param {*} data
   * @return {*}
   */
  crud.beforeClickDelete = (data) => {
    findHook('beforeClickDelete', data)
  }

  /**
   * @description: 导出方法
   * @return {*}
   */
  crud.doExport = () => {}

  onMounted(() => {
    crud.toQuery()
  })
  return crud
}
