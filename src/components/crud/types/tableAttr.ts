/*
 * @Author: E-Dreamer
 * @Date: 2022-07-07 16:30:30
 * @LastEditTime: 2022-07-08 15:17:40
 * @LastEditors: E-Dreamer
 * @Description:
 */
export interface tableAttr {
  // el-table props
  table?: {}
  // table 全选栏的 props 调用函数 OnXXX
  selection?: {}
  // table 操作栏的props
  operation?: {}
}

export interface tableColumn {
  label: string
  prop: string
  // 是否使用插槽 prop就是插槽的name
  slotProps?: boolean
}
