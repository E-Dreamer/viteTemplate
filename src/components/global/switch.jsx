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
        <el-tooltip content={searchInfo[action.key] + ''} placement="top">
          <el-switch
            v-model={searchInfo[action.key]}
            active-color={action.activeColor || '#13ce66'}
            inactive-color={action.inactiveColor || '#ff4949'}
            active-value={action.active || true}
            inactive-value={action.inactive || false}
            disabled={action.disabled  || false}
            loading={action.loading || false}
            onBeforeChange={action.change || null}
          />
        </el-tooltip>
      )
    }
    return ()=> render()
  },
})
