/*
 * @Author: E-Dreamer
 * @Date: 2021-09-09 17:12:05
 * @LastEditTime: 2021-09-09 17:12:07
 * @LastEditors: E-Dreamer
 * @Description: 
 */
module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'no-console': 'off'
  }
};