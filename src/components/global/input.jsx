import { defineComponent, reactive } from 'vue'
export default defineComponent({
  props: {
    action: {
      type: Object,
      default: () => {
        return {}
      },
    },
    searchInfo: {
      type: Object,
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
          v-model={searchInfo[action.key]}
          clearable
          {...componentProps}
          show-password
        ></el-input>
      )
    }
    const textareaRender = () => {
      return (
        <el-input
          v-model={searchInfo[action.key]}
          clearable
          type="textarea"
          {...componentProps}
        />
      )
    }
    const numberRender = () => {
      return (
        <el-input-number
          v-model={searchInfo[action.key]}
          style={{ width: '100%' }}
          min={action.min || 0}
          max={action.max || 10000}
          controls-position="right"
          clearable
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
