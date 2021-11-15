/*
 * @Author: E-Dreamer
 * @Date: 2021-11-15 15:08:46
 * @LastEditTime: 2021-11-15 16:05:03
 * @LastEditors: E-Dreamer
 * @Description:
 */
/**
 * @description:
 * @param {*} title
 * @param {*} message
 * @param {*} show-cancel-button
 * @param {*} show-confirm-button
 *
 * @return {*}
 */
import comp from './index.vue'
import { createApp, nextTick } from 'vue'
const instanceList = []
function createInstance() {
  const app = createApp(comp)
  const root = document.createElement('div')
  document.body.appendChild(root)
  const instance = app.mount(root)
  return instance
}
function getInstance() {
  if (!instanceList.length) {
    const instance = createInstance()
    instanceList.push(instance)
  }
  return instanceList[instanceList.length - 1]
}

function MesBox(options) {
  const Instance = getInstance()
  Object.assign(Instance, options)
  nextTick(()=>{
    Instance.show = true;
  })
  return new Promise((resolve, reject) => {
    Instance.cancel = ()=>{
      reject()
      nextTick(()=>{
        Instance.show = false;
      })
    }
    Instance.ok = ()=>{
      resolve()
      nextTick(()=>{
        Instance.show = false;
      })
    }
  })
}

export default MesBox
