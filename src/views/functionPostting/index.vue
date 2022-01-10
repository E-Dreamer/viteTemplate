<!--
 * @Author: E-Dreamer
 * @Date: 2021-12-29 09:03:36
 * @LastEditTime: 2022-01-10 13:11:23
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

  <DCarousel v-model="pageIndex" style="width:600px;height: 280px;margin: 0 auto 200px;">
    <img
      src="https://img0.baidu.com/it/u=3617321156,3624131942&fm=26&fmt=auto"
      height="280"
    />
    <img
      src="https://img0.baidu.com/it/u=1093888349,2542306625&fm=26&fmt=auto"
      height="280"
    />
  </DCarousel>
</template>

<script setup>
import FunctionalTable from '@com/FunctionalTable'
import DCarousel from '@com/Carousel'
import { ref } from 'vue'
const visibleKeys = ref(['date', 'name'])
const pageIndex = ref(1)
const onClick = () => {
  if (visibleKeys.value.includes('address')) {
    visibleKeys.value = ['date', 'name']
  } else {
    visibleKeys.value = ['date', 'name', 'address']
  }

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