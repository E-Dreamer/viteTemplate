/*
 * @Author: E-Dreamer
 * @Date: 2022-07-07 11:19:25
 * @LastEditTime: 2022-07-07 11:46:24
 * @LastEditors: E-Dreamer
 * @Description:
 */
export interface Action {
  // 字段
  field: string
  // label
  label: string
  // 组件类型
  component: 'input' | 'checkout' | 'radio' | 'select' | 'switch'
  // checkout | radio | select 组件类型时 存在
  options?: Array<any>
}

export interface SearchInfo {
  [key: string]: string | number | Array<any>
}
