/*
 * @Author: E-Dreamer
 * @Date: 2021-10-27 10:23:44
 * @LastEditTime: 2021-10-27 13:32:11
 * @LastEditors: E-Dreamer
 * @Description: 
 */
// globEager时立即引入，glob是异步引入
const tem = import.meta.globEager('./*.jsx')
const modules = Object.keys(tem).reduce((modules,path) =>{
  const name  = 'action' + path.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = tem[path]
  //globEager 时  使用
  modules[name] = value.default
  // modules[name] = value;
  return modules
},{})
console.log(modules)
export default modules