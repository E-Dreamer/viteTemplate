/*
 * @Author: E-Dreamer
 * @Date: 2021-09-18 13:41:15
 * @LastEditTime: 2021-09-18 13:57:27
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { createApp,nextTick } from "vue";
import ToastTemplate from './index.vue'
let toastPool = [];
function createInstance(){
  const app = createApp(ToastTemplate);
  const root = document.createElement('div');
  document.body.appendChild(root);
  const instance = app.mount(root);
  return instance;
}

function getInstance(){
  if(toastPool.length){
    const instance = createInstance();
    toastPool.push(instance);
  }
  return toastPool[toastPool.length - 1];
}
function parseOptions(message){
  if(message !== null && typeof message === 'object'){
    return message;
  }
  return {message};
}
function Toast(options){
  const toast = createInstance();
  const parsedOptions = parseOptions(options);
  Object.assign(toast,parsedOptions);
  nextTick(()=>{
    toast.visible = true;
    setTimeout(() => {
      toast.close();
    }, toast.duration);
  })
  return toast;
}

Toast.success = ()=>{}
Toast.fail = ()=>{}
Toast.loading = ()=>{}
export default Toast