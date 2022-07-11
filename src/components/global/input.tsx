import { InputProps } from 'element-plus';
import { Component, defineComponent, PropType } from 'vue'
import { SearchInfo, Action } from './types/action'

interface InputAction extends Action {
  componentProps?: InputProps,
  subType?: 'password' | 'textarea' | 'number'
}
export default defineComponent({
  props: {
    action: {
      type: Object as PropType<InputAction>,
      default: () => {
        return {}
      },
    },
    searchInfo: {
      type: Object as PropType<SearchInfo>,
      default: () => {
        return {}
      },
    },
  },
  setup(props, context) {
    const { action, searchInfo } = props

    const componentProps = action?.componentProps
    const defaultRender = () => {
      return (
        <el-input
          v-model={searchInfo[action.field]}
          clearable
          {...componentProps}
        ></el-input>
      )
    }
    const passwordRender = () => {
      return (
        <el-input
          v-model={searchInfo[action.field]}
          clearable
          {...componentProps}
          show-password
        ></el-input>
      )
    }
    const textareaRender = () => {
      return (
        <el-input
          v-model={searchInfo[action.field]}
          clearable
          type="textarea"
          {...componentProps}
        />
      )
    }
    const numberRender = () => {
      return (
        <el-input-number
          v-model={searchInfo[action.field]}
          clearable
          min={componentProps?.maxlength || 0}
          {...componentProps}
        />
      )
    }
    const obj = {
      numberRender,
      textareaRender,
      passwordRender,
      defaultRender
    }
    const render = () => {
      const name = action.subType ? `${action.subType}Render` : 'defaultRender'
      // return eval(name + '()')
      return obj[name]()
    }
    return render
  },
})
