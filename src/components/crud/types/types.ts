import { ComputedRef, WritableComputedRef } from 'vue';
import { messageType, ElForm, ElTable } from "element-plus"
export type ElFormInstance = InstanceType<typeof ElForm>
export type ELTableInstance = InstanceType<typeof ElTable>
/*
 * @Author: E-Dreamer
 * @Date: 2022-07-15 14:08:34
 * @LastEditTime: 2022-07-15 14:31:15
 * @LastEditors: E-Dreamer
 * @Description: 
 */
export interface HookProps {
  beforeRefresh?: (crud: CrudProps, form: object) => void
  /** 刷新 - 之后 */
  afterRefresh?: (crud: CrudProps, form: object) => void
  /** 点击删除 - 之前 */
  beforeClickDelete?: (crud: CrudProps, form: object) => void
  /** 删除 - 之前 */
  beforeDelete?: (crud: CrudProps, form: object) => void
  /** 删除 - 之后 */
  afterDelete?: (crud: CrudProps, form: object) => void
  /** 删除取消 - 之前 */
  beforeDeleteCancel?: (crud: CrudProps, form: object) => void
  /** 删除取消 - 之后 */
  afterDeleteCancel?: (crud: CrudProps, form: object) => void
  /** 新建 - 之前 */
  beforeToAdd?: (crud: CrudProps, form: object) => void
  /** 新建 - 之后 */
  afterToAdd?: (crud: CrudProps, form: object) => void
  /** 编辑 - 之前 */
  beforeToEdit?: (crud: CrudProps, form: object) => void
  /** 编辑 - 之后 */
  afterToEdit?: (crud: CrudProps, form: object) => void
  /** 开始 "新建/编辑" - 之前 */
  beforeToCU?: (crud: CrudProps, form: object) => void
  /** 开始 "新建/编辑" - 之后 */
  afterToCU?: (crud: CrudProps, form: object) => void
  /** "新建/编辑" 验证 - 之前 */
  beforeValidateCU?: (crud: CrudProps, form: object) => void
  /** "新建/编辑" 验证 - 之后 */
  afterValidateCU?: (crud: CrudProps, form: object) => void
  /** 添加取消 - 之前 */
  beforeAddCancel?: (crud: CrudProps, form: object) => void
  /** 添加取消 - 之后 */
  afterAddCancel?: (crud: CrudProps, form: object) => void
  /** 编辑取消 - 之前 */
  beforeEditCancel?: (crud: CrudProps, form: object) => void
  /** 编辑取消 - 之后 */
  afterEditCancel?: (crud: CrudProps, form: object) => void
  /** 提交 - 之前 */
  beforeSubmit?: (crud: CrudProps, form: object) => void
  afterSubmit?: (crud: CrudProps, form: object) => void
  afterAddError?: (crud: CrudProps, form: object) => void
  afterEditError?: (crud: CrudProps, form: object) => void
}
export interface pageProps {
  // 页码
  page: number
  // 每页数据条数
  size: number
  // 总数据条数
  total: number
}

export interface CrudMethods {
  add: (form: object) => (Promise<any> | void)
  del: (id: string | number | any[]) => (Promise<any> | void)
  edit: (form: object) => (Promise<any> | void)
  get?: (id: string | number) => (Promise<any> | void)
}

export interface OptShowProps {
  add?: boolean
  edit?: boolean
  del?: boolean
  download?: boolean
  reset?: boolean
}

export interface StatusProps {
  add: number
  edit: number
  cu: ComputedRef<number> | number
  title: ComputedRef<string> | string
  dialog: WritableComputedRef<boolean> | boolean
}
export interface NOTIFICATION_TYPE_PROPS {
  SUCCESS: messageType
  WARNING: messageType
  INFO: messageType
  ERROR: messageType
}

export interface AuthProps {
  add?: string[]
  edit?: string[]
  del?: string[]
  download?: string[]
}


// useCrud 传递的参数
export interface CrudProps {
  // id字段名
  idField?: string
  // 标题
  title: string
  // 请求数据的url
  url: string
  // 待查询的对象
  query?: {
    [key: string]: any
  }
  // 查询数据的参数
  params?: {
    [key: string]: any
  }
  // Form 表单
  form: {
    [key: string]: any
  }
  // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
  sort?: string | Array<string>
  // CRUD Method
  crudMethod: CrudMethods
  // 按钮是否显示
  optShow?: OptShowProps
  // table 的 ref
  tableRef?: ELTableInstance | null
  // form表单的 ref 传递函数缺陷 第一次获取不到 因为存在于dialog 只有打开才能获取到
  // formRef: () => Ref<HTMLElement | null>
  formRef: () => ElFormInstance | null
}

//这是useCrud返回的接口
export interface useCrudProps extends CrudProps {
  // 是否展示筛选栏
  searchToggle: boolean
  // 消息的类型
  NOTIFICATION_TYPE: NOTIFICATION_TYPE_PROPS
  // 关于dialog的
  status: StatusProps
  // 默认查询参数
  defaultQuery: {
    [key: string]: any
  }
  defaultForm: {
    [key: string]: any
  }
  // 勾选的数据
  selections: any[]
  //table 数据
  data: any[]
  // 分页相关
  page: pageProps
  // 整体loading
  loading: boolean
  // 导出的 Loading
  downloadLoading: boolean
  // 删除的 Loading
  delAllLoading: boolean
  dataStatus: { [key: string | number]: any }
  // hook函数
  HOOK: HookProps

  notify: (message: string, type: messageType) => void
  getQueryParams: () => object
  refresh: () => void
  resetQuery: () => void
  toQuery: () => void
  sizeChangeHandler: (e: number) => void
  pageChangeHandler: (e: number) => void
  toggleChange: () => void
  selectionChange: (val: any[]) => void
  toAdd: () => void
  resetForm: (data?: object) => void
  toEdit: (data: object) => void
  cancelCU: () => void
  toDelete: (data: any[]) => void
  doDelete: (data: any[] | object) => void
  cancelDelete: (data: any[] | object) => void
  beforeClickDelete: (data: object) => void
  doExport: () => void
  submitCU: (flag?: boolean) => void
  doAdd: (flag?: boolean) => void
  doEdit: () => void
  getDataStatus: (id: number | string) => {
    edit: number
    delete: number
  }
  resetDataStatus: () => void
  getDataId: (data: object) => string | number
  toggleRowSelection: (selection: any[], data: { children: any[] }) => void
  selectChange: (selection: any[], row: { children: any[] }) => void
  selectAllChange: (selection: any[]) => void
  dleChangePage: (size: number) => void
}