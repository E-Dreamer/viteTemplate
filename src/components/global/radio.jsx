import { defineComponent } from 'vue'

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
  setup(props) {
    const { action, searchInfo } = props
    const render = () => {
      return (
        <el-radio-group v-model={searchInfo[action.key]} {...action.componentProps}>
          {action.options.map((item) => {
            return (
              <el-radio
                key={item.label}
                label={item.label}
              >
                {item.value}
              </el-radio>
            )
          })}
        </el-radio-group>
      )
    }
    return render
  },
})
