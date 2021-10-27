/**
 * @description: 多选框
 * @param {*}
 * @return {*}
 */
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
        <el-checkbox-group v-model={searchInfo[action.key]}>
         {
           action.options.map(item=>{
             return (
              <el-checkbox label={item.label} disabled={item.disabled || false} border={item.border || false} />
             )
           })
         }
        </el-checkbox-group>
      )
    }
    return () => render()
  },
})
