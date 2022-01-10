/*
 * @Author: E-Dreamer
 * @Date: 2022-01-10 10:39:33
 * @LastEditTime: 2022-01-10 13:22:58
 * @LastEditors: E-Dreamer
 * @Description: 分页的核心
 */
import {ref} from 'vue'

export default function usePage(defaultPageIndex:1) {
  //当前页码
  const pageIndex = ref(defaultPageIndex)
  // 最大页码
  // const maxPageIndex = ref(max);

  //跳到第几页
  const setPageIndex = (page:number)=>{
    pageIndex.value = page;
  }

  //一次性往前（往后）跳几页
  const jumpPage = (page:number)=>{
    pageIndex.value += page;
  }

  //上一页
  const prevPage = ()=> jumpPage(-1)

  //下一页
  const nextPage = ()=> jumpPage(1)

  return {pageIndex,setPageIndex,jumpPage,prevPage,nextPage}
}