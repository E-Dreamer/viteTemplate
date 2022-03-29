/*
 * @Author: E-Dreamer
 * @Date: 2021-09-08 11:05:39
 * @LastEditTime: 2022-03-29 16:59:05
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { createStore as _createStore } from 'vuex'
import getters from './getters'

const modulesFiles = import.meta.globEager('./modules/*.js')
// 不需要重复导出modules里面的js文件 `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = Object.keys(modulesFiles).reduce((modules, path) => {
  //  ./modules/app -> app
  const name = path.replace(/^\.\/\modules\/(.*)\.\w+$/, '$1')
  const value = modulesFiles[path]
  modules[name] = value.default
  return modules
}, {})

// export default createStore({
//   state:{},
//   mutations:{},
//   actions:{},
//   getters,
//   modules,
// })

export function createStore(params) {
  return _createStore({
    state: {},
    mutations: {},
    actions: {},
    getters,
    modules,
  })
}
