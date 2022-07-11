import { RadioProps } from 'element-plus'
import { defineComponent, PropType } from 'vue'
import { SearchInfo, Action } from './types/action'

interface radioProps extends Action {
  componentProps?:RadioProps,
  optionsProps?:object
}
export default defineComponent({
  props: {
    action: {
      type: Object as PropType<radioProps>,
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
  setup(props) {
    const { action, searchInfo } = props
    
    const componentProps = action?.componentProps
    const render = () => {
      return (
        <el-radio-group v-model={searchInfo[action.field]} {...componentProps}>
          {action.options && action.options.map((item) => {
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
