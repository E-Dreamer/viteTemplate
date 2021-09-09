/*
 * @Author: E-Dreamer
 * @Date: 2021-09-07 15:51:05
 * @LastEditTime: 2021-09-07 16:02:32
 * @LastEditors: E-Dreamer
 * @Description: 
 */
let env = '';
const {
  MODE,
  VITE_APP_CURRENTMODE
} =
import.meta.env;
console.log(
  import.meta.env)
if (MODE === 'dev') {
  env = 'dev'
}
if (VITE_APP_CURRENTMODE) {
  switch (VITE_APP_CURRENTMODE) {
    case 'dev':
      env = 'dev'
      break;
    case 'producation':
      env = 'production'
      break;
    case 'test':
      env = 'test'
      break;
    default:
      break;
  }
}
const baseURL = {
  dev: "http://www.dev.com",
  test: "http://www.test.com",
  production: "http://www.production.com",
};

const config = {
  env,
  baseURL: baseURL[env],
};

export default config
