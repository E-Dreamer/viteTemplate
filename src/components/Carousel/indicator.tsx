/*
 * @Author: E-Dreamer
 * @Date: 2022-01-10 10:43:39
 * @LastEditTime: 2022-01-10 11:39:51
 * @LastEditors: E-Dreamer
 * @Description: 指示器组件
 */

import { defineComponent } from "vue";

export default defineComponent({
  name: 'DCarouselIndicator',
  props: {
    modelValue: {
      type: Number,
    },
    count: {
      type: Number,
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const indicatorArr = Array.from(new Array(props.count).keys()) // 生成指示器数组
    return ()=>{
      return <div className="carousel_indicator">
      {
        indicatorArr.map((item, index) => {
          return <div className={`carousel_indicator_item${props.modelValue  === index + 1 ? ' active' : ''}`} onClick={() => emit('update:modelValue', index + 1)}></div>
        })
      }
    </div>
    }
  }
})