import { defineComponent, PropType } from 'vue'
// 还有Select V2 虚拟列表选择器 但是在测试中 不在实际场景中使用
import { SearchInfo, Action } from './types/action'

interface selectProps extends Action {
  componentProps?: object,
  optionsProps?: object,
  group?: Array<any>,
  labelFilter?: (item: object) => void;
}
export default defineComponent({
  props: {
    action: {
      type: Object as PropType<selectProps>,
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
    const labelRender = (item) => {
      if (action.labelFilter) {
        return action.labelFilter(item)
      }
      return item.label
    }
    const optionsRender = (arr) => {
      return arr.map((item) => {
        return (
          <el-option
            key={item.value}
            label={labelRender(item)}
            value={parseFloat(item.value)}
            disabled={item.disabled}
          ></el-option>
        )
      })
    }
    const groupRender = (arr) => {
      return arr.map((group) => {
        return (
          <el-option-group key={group.label} label={group.label}>
            {optionsRender(group.options)}
          </el-option-group>
        )
      })
    }
    const render = () => {
      return (
        <el-select
          style={{ width: '100%' }}
          clearable
          v-model={searchInfo[action.field]}
          {...componentProps}
        >
          {action.group
            ? groupRender(action.group)
            : optionsRender(action.options)}
        </el-select>
      )
    }

    return render
  },
})
