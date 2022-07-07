import { defineComponent,PropType } from 'vue'

import { SearchInfo, Action } from './types/action'

interface switchProps extends Action {
  componentProps?:object,
  optionsProps?:object
}
export default defineComponent({
  props: {
    action: {
      type: Object as PropType<switchProps>,
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
        <el-tooltip content={searchInfo[action.field] + ''} placement='top'>
          <el-switch
            v-model={searchInfo[action.field]}
            {...componentProps}
          />
        </el-tooltip>
      )
    }
    return render
  },
})
