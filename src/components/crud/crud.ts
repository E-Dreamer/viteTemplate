
/*
 * @Author: E-Dreamer
 * @Date: 2022-07-08 17:00:37
 * @LastEditTime: 2022-07-15 14:28:07
 * @LastEditors: E-Dreamer
 * @Description: 
 */
// function mergeOptions(src: object, opts: object) {
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

import { CrudProps, NOTIFICATION_TYPE_PROPS, useCrudProps } from "./types/types"
import { ElMessage } from 'element-plus'
import { reactive, computed, onMounted } from 'vue';

//深拷贝
function deepClone(source: any): object {
  if (typeof source !== 'object' || source == null) {
    return source
  }
  const target = Array.isArray(source) ? [] : {}
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        target[key] = deepClone(source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
//判断是不是函数
const isFn = (result: object) => {
  return Object.prototype.toString.call(result) === '[object Function]'
}
//! 假设的请求
function initData(url: string, params: object) {
  return new Promise((resolve, reject) => {
    let data = [{ id: 1, name: '张三', address: '北京' }]
    for (let i = 0; i < 10; i++) {
      data.push({
        id: data.length + 1,
        name: `张三${data.length + 1}`,
        address: '北京',
      })
    }
    resolve(data)

    reject('报错了')
  })
}

//钩子函数
const HOOK = {
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

const defaultObj: useCrudProps = {
  idField: 'id',
  title: '',
  url: '',
  selections: [],
  query: {},
  params: {},
  form: {},
  data: [],
  status: {
    add: STATUS.NORMAL,
    edit: STATUS.NORMAL,
    cu: STATUS.NORMAL,
    title: '',
    dialog: false,
  },
  defaultForm: {},
  sort: ['id,desc'],
  searchToggle: true,
  HOOK,
  NOTIFICATION_TYPE,
  defaultQuery: {},
  page: {
    page: 0,
    size: 10,
    total: 0,
  },
  crudMethod: {
    add: () => { },
    del: () => { },
    edit: () => { },
    get: () => { },
  },
  optShow: {
    add: true,
    edit: true,
    del: true,
    download: true,
    reset: true,
  },
  loading: false,
  downloadLoading: false,
  delAllLoading: false,
  dataStatus: {},
  tableRef: null,
  formRef: () => null,
  notify: () => { },
  getQueryParams: () => {
    return {}
  },
  refresh: () => { },
  resetQuery: () => { },
  toQuery: () => { },
  sizeChangeHandler: () => { },
  pageChangeHandler: () => { },
  toggleChange: () => { },
  selectionChange: () => { },
  toAdd: () => { },
  resetForm: () => { },
  toEdit: () => { },
  cancelCU: () => { },
  submitCU: () => { },
  doAdd: () => { },
  doEdit: () => { },
  toDelete: () => { },
  doDelete: () => { },
  resetDataStatus: () => { },
  cancelDelete: () => { },
  beforeClickDelete: () => { },
  doExport: () => { },
  getDataStatus: () => {
    return {
      edit: 0,
      delete: 0,
    }
  },
  getDataId: () => {
    return ''
  },
  toggleRowSelection: () => { },
  selectChange: () => { },
  selectAllChange: () => { },
  dleChangePage: () => { },
}


export function useCrud(params: CrudProps): useCrudProps {
  let crud: useCrudProps = reactive(Object.assign(defaultObj, params))
  crud.defaultQuery = deepClone(crud.query)
  crud.defaultForm = deepClone(crud.form)
  crud.status = {
    add: STATUS.NORMAL,
    edit: STATUS.NORMAL,
    cu: computed((): number => {
      if (
        crud.status.add === STATUS.NORMAL &&
        crud.status.edit === STATUS.NORMAL
      ) {
        return STATUS.NORMAL
      } else if (
        crud.status.add === STATUS.PREPARED ||
        crud.status.edit === STATUS.PREPARED
      ) {
        return STATUS.PREPARED
      } else if (
        crud.status.add === STATUS.PROCESSING ||
        crud.status.edit === STATUS.PROCESSING
      ) {
        return STATUS.PROCESSING
      }
      throw new Error("wrong crud's cu status")
    }),
    title: computed((): string => {
      return crud.status.add > STATUS.NORMAL
        ? `新增${crud.title}`
        : crud.status.edit > STATUS.NORMAL
          ? `编辑${crud.title}`
          : crud.title
    }),
    dialog: computed({
      get: () => {
        return crud.status.cu > 0
      },
      set: (val) => {
        //
        return true
      },
    }),
  }

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

  /**
   * 通用的提示
   */
  const submitSuccessNotify = () => {
    crud.notify(msg.submit, crud.NOTIFICATION_TYPE!.SUCCESS)
  }
  const addSuccessNotify = () => {
    crud.notify(msg.add, crud.NOTIFICATION_TYPE!.SUCCESS)
  }
  const editSuccessNotify = () => {
    crud.notify(msg.edit, crud.NOTIFICATION_TYPE!.SUCCESS)
  }
  const delSuccessNotify = () => {
    crud.notify(msg.del, crud.NOTIFICATION_TYPE!.SUCCESS)
  }
  /**
   * @description: 通知
   * @param {*} message 內容
   * @param {*} type element messageType "success" | "info" | "warning" | "error"
   * @return {*}
   */
  crud.notify = (message, type = crud.NOTIFICATION_TYPE.INFO) => {
    return ElMessage({
      message,
      type,
      duration: 2500,
    })
  }

  /**
   * @description: 获取查询参数
   * @return {*}
   */
  crud.getQueryParams = () => {
    Object.keys(crud.query as object).length !== 0 &&
      Object.keys(crud.query as object).forEach((item) => {
        if (crud.query?.[item] === null || crud.query?.[item] === '')
          crud.query[item] = undefined
      })
    Object.keys(crud.params as object).length !== 0 &&
      Object.keys(crud.params as object).forEach((item) => {
        if (crud.params?.[item] === null || crud.params?.[item] === '')
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

    return new Promise((resolve, reject) => {
      crud.loading = true
      initData(crud.url, crud.getQueryParams())
        .then((data: any) => {
          crud.page.total = data.totalElements
          crud.data = data
          crud.resetDataStatus()
          crud.loading = false
          findHook('afterRefresh')
          resolve(data)
        })
        .catch((err) => {
          crud.loading = false
          reject(err)
        })
    })
  }

  /**
   * @description: 重置查询参数
   * @param {*} flag 重置后进行查询操作
   * @return {*}
   */
  crud.resetQuery = (flag = true) => {
    const defaultQuery = deepClone(crud.defaultQuery)
    const query = crud.query
    Object.keys(query as object).forEach((key) => {
      query && (query[key] = defaultQuery[key])
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
  crud.resetForm = (data) => {
    const form = data || crud.defaultForm
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
  crud.toEdit = (data) => {
    const clone = deepClone(data)
    crud.resetForm(clone)
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
  crud.submitCU = (flag = true) => {
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
        crud.doAdd(flag)
      } else if (crud.status.edit === STATUS.PREPARED) {
        crud.doEdit()
      }
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
    let dataStatus: any
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
    return crud.crudMethod.del(ids)?.then(() => {
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
  crud.doExport = () => { }

  /**
   * @description: 
   * @return {*}
   */
  /**
   * @description: 执行添加
   * @param {*} flag 是否重置表单
   * @return {*}
   */
  crud.doAdd = (flag = true) => {
    if (!findHook('beforeSubmit')) {
      return
    }
    crud.status.add = STATUS.PROCESSING
    crud.crudMethod.add(crud.form)?.then(() => {
      crud.status.add = STATUS.NORMAL
      if (flag) {
        crud.resetForm()
      }
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
    crud.crudMethod.edit(crud.form)?.then(() => {
      crud.status.edit = STATUS.NORMAL
      crud.getDataStatus(crud.getDataId(crud.form)).edit = STATUS.NORMAL
      editSuccessNotify()
      findHook('afterSubmit')
      crud.resetForm()
      crud.refresh()
    })
      .catch(() => {
        crud.status.edit = STATUS.PREPARED
        findHook('afterEditError')
      })
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
   * @description: 重置数据状态
   * @return {*}
   */
  crud.resetDataStatus = () => {
    const dataStatus = {}
    function resetStatus(datas: any[]) {
      if (datas?.length) {
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
    }
    resetStatus(crud.data)
    crud.dataStatus = dataStatus
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
   * @description: 切换选中状态
   * @param {*} selection
   * @param {*} data
   * @return {*}
   */
  crud.toggleRowSelection = (selection, data) => {
    if (data.children) {
      data.children.forEach((val: { children: any[];[key: string]: any }) => {
        crud.tableRef?.toggleRowSelection(val, false)
        if (val.children) {
          crud.toggleRowSelection(selection, val)
        }
      })
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
   * @description: 用于树形表格多选, 选中所有
   * @param {*} selection
   * @return {*}
   */
  crud.selectAllChange = (selection) => {
    // 如果选中的数目与请求到的数目相同就选中子节点，否则就清空选中
    if (selection.length === crud.data?.length) {
      selection.forEach((val) => {
        crud.selectChange?.(selection, val)
      })
    } else {
      crud.tableRef?.clearSelection()
    }
  }


  /**
   * @description: 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
   * @param {*} size 页码
   * @return {*}
   */
  crud.dleChangePage = (size) => {
    if (crud.data.length === size && crud.page.page !== 1) {
      crud.page.page -= 1
    }
  }

  onMounted(() => {
    crud.refresh()
  })
  return crud;
}