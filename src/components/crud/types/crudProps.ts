import { ComputedRef, readonly, Ref } from 'vue'
import { MessageType } from 'element-plus/lib/components/message/src/types'
/*
 * @Author: E-Dreamer
 * @Date: 2022-07-07 14:54:48
 * @LastEditTime: 2022-07-07 16:58:44
 * @LastEditors: E-Dreamer
 * @Description:
 */
export  interface HookProps {
  beforeRefresh?: (crud, form: object) => void
  /** 刷新 - 之后 */
  afterRefresh?: (crud, form: object) => void
  /** 点击删除 - 之前 */
  beforeClickDelete?: (crud, form: object) => void
  /** 删除 - 之前 */
  beforeDelete?: (crud, form: object) => void
  /** 删除 - 之后 */
  afterDelete?: (crud, form: object) => void
  /** 删除取消 - 之前 */
  beforeDeleteCancel?: (crud, form: object) => void
  /** 删除取消 - 之后 */
  afterDeleteCancel?: (crud, form: object) => void
  /** 新建 - 之前 */
  beforeToAdd?: (crud, form: object) => void
  /** 新建 - 之后 */
  afterToAdd?: (crud, form: object) => void
  /** 编辑 - 之前 */
  beforeToEdit?: (crud, form: object) => void
  /** 编辑 - 之后 */
  afterToEdit?: (crud, form: object) => void
  /** 开始 "新建/编辑" - 之前 */
  beforeToCU?: (crud, form: object) => void
  /** 开始 "新建/编辑" - 之后 */
  afterToCU?: (crud, form: object) => void
  /** "新建/编辑" 验证 - 之前 */
  beforeValidateCU?: (crud, form: object) => void
  /** "新建/编辑" 验证 - 之后 */
  afterValidateCU?: (crud, form: object) => void
  /** 添加取消 - 之前 */
  beforeAddCancel?: (crud, form: object) => void
  /** 添加取消 - 之后 */
  afterAddCancel?: (crud, form: object) => void
  /** 编辑取消 - 之前 */
  beforeEditCancel?: (crud, form: object) => void
  /** 编辑取消 - 之后 */
  afterEditCancel?: (crud, form: object) => void
  /** 提交 - 之前 */
  beforeSubmit?: (crud, form: object) => void
  afterSubmit?: (crud, form: object) => void
  afterAddError?: (crud, form: object) => void
  afterEditError?: (crud, form: object) => void
}
interface pageProps {
  // 页码
  page?: number
  // 每页数据条数
  size?: number
  // 总数据条数
  total?: number
}
interface CrudMethods {
  add: (form: object) => void
  del: (id: string | number) => void
  edit: (form: object) => void
  get: (id: string | number) => void
}
interface OptShowProps {
  add?: boolean
  edit?: boolean
  del?: boolean
  download?: boolean
  reset?: boolean
}
interface StatusProps {
  add?: number
  edit?: number
  cu?: ComputedRef
  title?: ComputedRef
  dialog?: ComputedRef
}
export interface NOTIFICATION_TYPE_PROPS {
  SUCCESS: MessageType
  WARNING: MessageType
  INFO: MessageType
  ERROR: MessageType
}
export interface CrudProps {
  // id字段名
  idField?: string
  // 标题
  title: string
  // 请求数据的url
  url: string
  // 表格数据
  data?: Array<any>
  // 选择项
  selections?: Array<any>
  // 待查询的对象
  query?: object
  // 查询数据的参数
  params?: object
  // Form 表单
  form: object
  // 重置表单
  defaultForm?: object
  // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
  sort?: string | Array<string>
  // 分页相关
  page?: pageProps
  // 整体loading
  loading?: boolean
  // 导出的 Loading
  downloadLoading?: boolean
  // 删除的 Loading
  delAllLoading?: boolean
  // CRUD Method
  crudMethod: CrudMethods
  // 按钮是否显示
  optShow?: OptShowProps
  // hook函数
  HOOK?: HookProps
  // table 的 ref
  tableRef?: Ref<HTMLElement | null>
  // form表单的 ref
  // formRef?: Ref<HTMLElement | null>
  formRef?: () => Ref<HTMLElement | null>
  // 是否展示筛选栏
  searchToggle?: boolean
  // 消息的类型
  readonly NOTIFICATION_TYPE: NOTIFICATION_TYPE_PROPS
  // 关于dialog的
  status?: StatusProps
  // 默认查询参数
  defaultQuery?: object
  notify?: (message: string, type: MessageType) => void
  getQueryParams?: () => void
  refresh?: () => void
  resetQuery?: () => void
  toQuery?: () => void
  sizeChangeHandler?: (e: number) => void
  pageChangeHandler?: (e: number) => void
  toggleChange?: () => void
  selectionChange?: (val: any[]) => void
  toAdd?: () => void
  resetForm?: () => void
  toEdit?: () => void
  cancelCU?: () => void
  toDelete?: (data: any[]) => void
  doDelete?: (data: any[]) => void
  cancelDelete?: (data: any[]) => void
  beforeClickDelete?: (data: any[]) => void
  doExport?: () => void
}

export interface AuthProps {
  add?: string[]
  edit?: string[]
  del?: string[]
  download?: string[]
}

export interface NOTIFICATION_TYPE {
  SUCCESS: string
  WARNING: string
  INFO: string
  ERROR: string
}
