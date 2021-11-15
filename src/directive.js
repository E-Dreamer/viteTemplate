/*
 * @Author: E-Dreamer
 * @Date: 2021-11-15 09:28:56
 * @LastEditTime: 2021-11-15 10:04:10
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { ElMessage } from 'element-plus'
export default {
  copy: {
    // 指令是具有一组生命周期的钩子：
    // 在绑定元素的 attribute 或事件监听器被应用之前调用
    created() {},
    // 在绑定元素的父组件挂载之前调用
    beforeMount() {},
    // 绑定元素的父组件被挂载时调用
    mounted(el, { value }) {
      el.$value = value
      el.handler = () => {
        if (!el.$value) {
          return ElMessage({
            showClose: true,
            message: '复制失败',
            type: 'error',
          })
        }
        //创建textarea
        const textarea = document.createElement('textarea')
        // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
        //只读属性
        textarea.readOnly = 'readonly'
        textarea.style.position = 'absolute'
        textarea.style.left = '-9999px'
        //将要复制的值 给textarea
        textarea.value = el.$value
        // 将 textarea 插入到 body 中
        document.body.appendChild(textarea)
        //选中内容
        textarea.select()
        // 方法用于设定<input> 或 <textarea> 元素中当前选中文本的起始和结束位置。
        textarea.setSelectionRange(0, textarea.value.length)
        //复制命令会将当前选中的内容复制到剪切板中
        const result = document.execCommand('Copy')
        if (result) {
          ElMessage({
            showClose: true,
            message: '复制成功',
            type: 'success',
          })
        }
        document.body.removeChild(textarea)
      }
      // 绑定点击事件，就是所谓的一键 copy 啦
      el.addEventListener('click', el.handler)
    },
    // 在包含组件的 VNode 更新之前调用
    beforeUpdate() {},
    // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
    updated(el, { value }) {
      el.$value= value;
    },
    // 在绑定元素的父组件卸载之前调用
    beforeUnmount() {},
    // 卸载绑定元素的父组件时调用
    unmounted(el) {
      el.removeEventListener('click', el.handler)
    },
  },
}
