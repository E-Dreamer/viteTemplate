/*
 * @Author: E-Dreamer
 * @Date: 2022-01-10 10:43:39
 * @LastEditTime: 2022-01-10 13:26:07
 * @LastEditors: E-Dreamer
 * @Description: carousel组件 
 */
import { defineComponent, renderSlot, useSlots, watch } from 'vue'
import usePage from './usepage'
import './index.less'
import DCarouselIndicator from './indicator'

export default defineComponent({
  name: 'DCarousel',
  components: { DCarouselIndicator },
  props: {
    modelValue: {
      type: Number
    }
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    // 获取插槽内容中的元素数量
    // const count = useSlots().default().length 同下
    const count = slots?.default()?.length
    const { pageIndex, prevPage, nextPage, setPageIndex } = usePage(1)

    const { modelValue } = props;
    // 同步监听外部modelValue和内部pageIndex的变化，实现父子组件状态同步
    watch(modelValue, (newVal: number) => {
      pageIndex.value = newVal
    })

    watch(pageIndex, (newVal: number) => {
      emit('update:modelValue', newVal)
    })

    return () => {
      return <div className='carousel'>
        <div className='carousel_item_container' style={{
          width: count * 100 + '%',
          left: -(pageIndex.value - 1) * 100 + '%'
        }}>
          {renderSlot(useSlots(), 'default')}
        </div>
       
        <div className="carousel_pagination">
          <button disabled={ props.modelValue <= 1 ? true : false } className="arrow arrow-left" onClick={() => {
            emit('update:modelValue', props.modelValue - 1)
            prevPage()
          }}>
            <svg width="18px" height="18px" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon fill="#293040" fill-rule="nonzero" points="10.7071068 12.2928932 9.29289322 13.7071068 3.58578644 8 9.29289322 2.29289322 10.7071068 3.70710678 6.41421356 8"></polygon></g></svg>
          </button>
          <button disabled={props.modelValue >= count ? true : false} className="arrow arrow-right" onClick={() => {
            emit('update:modelValue', props.modelValue + 1)
            nextPage()
          }}>
            <svg width="18px" height="18px" viewBox="0 0 16 16" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon fill="#293040" fill-rule="nonzero" transform="translate(8.146447, 8.000000) scale(-1, 1) translate(-8.146447, -8.000000) " points="11.7071068 12.2928932 10.2928932 13.7071068 4.58578644 8 10.2928932 2.29289322 11.7071068 3.70710678 7.41421356 8"></polygon></g></svg>
          </button>
        </div>
        // 新增指示器
        {/* <div class="devui-carousel-indicator">
          {
            indicatorArr.map((item, index) => {
              return <div class={`devui-carousel-indicator-item${pageIndex.value === index+1 ? ' active' : ''}`} onClick={() => setPageIndex(index + 1)}></div>
            })
          }
        </div> */}

        {
          slots.indicator
            ? slots.indicator()
            : <DCarouselIndicator count={count} v-model={pageIndex.value}></DCarouselIndicator>
        }
      </div>
    }
  }
})