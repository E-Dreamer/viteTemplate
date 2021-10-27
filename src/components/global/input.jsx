import { defineComponent,reactive } from 'vue'
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
  setup(props,context) {
    const { action, searchInfo } = props
    const defaultRender = () => {
      return (
        <el-input
          v-model={searchInfo[action.key]}
          disabled={action.disabled}
          placeholder={searchInfo[action.plac]}
        ></el-input>
      )
    }
    const passwordRender = ()=>{
      return (
        <el-input
          v-model={searchInfo[action.key]}
          disabled={action.disabled}
          placeholder={searchInfo[action.plac]}
          show-password
        ></el-input>
      )
    }
    const textareaRender = () => {
      return (
        <el-input
          v-model={searchInfo[action.key]}
          rows={action.rows}
          type="textarea"
          disabled={action.disabled}
          placeholder={searchInfo[action.plac]}
        />
      )
    }
    const numberRender = () => {
      return (
        <el-input-number
          v-model={searchInfo[action.key]}
          disabled={action.disabled}
          style={{width:'100%'}}
          min={action.min || 0}
          max={action.max || 10000 }
          controls-position='right'
          onChange={numberChange}
          placeholder={searchInfo[action.plac]}
        />
      )
    }
    const numberChange = (val)=>{
      console.log('触发了？？',val);
    }
    // const state = reactive({
    //   defaultRender,
    //   numberRender,
    //   textareaRender,
    // })
    const render = ()=>{
      const name =  action.subType ? `${action.subType}Render` : 'defaultRender'
      return eval(name+'()')
      // return state[name]()
    }
    return () => render()
  },
})
