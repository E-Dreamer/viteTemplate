import { defineComponent } from 'vue'
// 还有Select V2 虚拟列表选择器 但是在测试中 不在实际场景中使用
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
    const labelRender = (item)=>{
      if(action.labelFilter){
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
          filterable
          clearable
          multiple={action.multiple || false}
          disabled={action.disabled || false}
          v-model={searchInfo[action.key]}
          placeholder={searchInfo[action.plac]}
          loading={action.loading || false}
          filter-method={
            action.filter
              ? (val) => action.filter(val, action.group || action.options)
              : null
          }
          remote-method={
            action.remote
              ? (val) => action.remote(val, action.group || action.options)
              : null
          }
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
