<!--
 * @Author: E-Dreamer
 * @Date: 2021-12-29 09:03:36
 * @LastEditTime: 2021-12-29 09:47:24
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <el-button @click="onClick">变化</el-button>
  <FunctionalTable :data="tableData" :visibleKeys="visibleKeys" :style="{ width: '100%' }">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="address" label="Address" />       
  </FunctionalTable>
</template>

<script setup>
// export default {
//   setup() {

//   },
// }
import FunctionalTable from '@com/FunctionalTable'

import { ref } from 'vue'
const visibleKeys = ref(['date', 'name'])
const onClick = () => {
  visibleKeys.value = ['date', 'name', 'address']
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>