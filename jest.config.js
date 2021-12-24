/*
 * @Author: E-Dreamer
 * @Date: 2021-12-24 11:10:44
 * @LastEditTime: 2021-12-24 13:38:33
 * @LastEditors: E-Dreamer
 * @Description:
 */
const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  // 别名设置
  moduleNameMapper: {
    // '@/(.*)$': '<rootDir>/src/components/$1',
    "@v/(.*)$":'<rootDir>/src/views/$1'
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // 测试文件
  testMatch: ['<rootDir>/test/**/*.spec.(ts|tsx|js)'],
  transformIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
    "^.+\\.(t|j)sx?$": "ts-jest"
    // '^.+\\.(ts|tsx|js|jsx)$': [
    //   'babel-jest',
    //   {
    //     presets: [
    //       ['@babel/preset-env', { targets: { node: 'current' } }],
    //       ['@babel/preset-typescript'],
    //     ],
    //     plugins: ['@vue/babel-plugin-jsx'],
    //   },
    // ],
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es|other-es-lib))"]
}
