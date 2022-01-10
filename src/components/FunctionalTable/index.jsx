/**
 * @description: 函数式组件封装
 * @param {*}
 * @return {*}
 */
/*它们将接收两个参数：
 props 和 context。context 参数是一个对象，包含组件的 attrs、slots 和 emit property。*/
const FunctionalTable = (props,context)=>{
  // 获得插槽里的 vNodes
  const vNodes = context.slots.default();
  // 过滤 vNodes
  const filteredVNodes = props.visibleKeys === null ? vNodes : vNodes.filter(node => props.visibleKeys.includes(node?.props?.prop))
 // 把属性透传给el-table 
 return <el-table {...context.attrs}>
  {filteredVNodes}
</el-table>
}
// 这就是组件接收的props
FunctionalTable.props = {
  visibleKeys:{
    type:Array,
    default:()=> null
  }
}

export default FunctionalTable