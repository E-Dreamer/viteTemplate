<!--
 * @Author: E-Dreamer
 * @Date: 2021-10-26 16:57:14
 * @LastEditTime: 2021-11-02 16:26:20
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <el-form ref="SForm" :model="form" :rules="rules" label-width="100px">
    <el-row type="flex" class="row" :gutter="20">
      <el-col v-for="(item, index) in formList" :key="index" :span="item.colSpan || 12">
        <el-form-item :label="item.label" :label-width="item.labelWidth" :prop="item.key">
          <!-- 自定义模板 -->
          <template v-if="item.type === 'default'">
            <slot :name="item.key" :formData="form" :item="item"></slot>
          </template>
          <template v-else>
            <component :is="'action' + item.type" :key="index" :action="item" :searchInfo="form"></component>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { nextTick, ref } from 'vue'
import action from '@com/global/index.js'
export default {
  name: 'SForm',
  components: { ...action },
  props: {
    formList: {
      type: Array,
      required: true,
      default: () => {
        return []
      },
    },
    form: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      },
    },
    isScroll:{
      type:Boolean,
      default:true
    }
  },
  setup (props, context) {
    const SForm = ref(null)
    const scroll = (fields) => {
      const dom = document.getElementsByClassName('el-overlay')
      let top
      nextTick(() => {
        const error = document.getElementsByClassName('el-form-item__error')
        if (!top) {
          top = error[0].offsetTop
        }

        if (top) {
          // 向上滚动
          if (dom[0].scrollTop >= top) {
            const timeTop = setInterval(() => {
              dom[0].scrollTop -= 20 // 可以自己设置
              if (dom[0].scrollTop <= top) {
                clearInterval(timeTop)
              }
            }, 10)
          } else {
            const timeTop = setInterval(() => {
              dom[0].scrollTop += 20 // 可以自己设置
              if (dom[0].scrollTop >= top) {
                clearInterval(timeTop)
              } else if (
                dom[0].scrollTop + dom[0].clientHeight >=
                dom[0].scrollHeight
              ) {
                clearInterval(timeTop)
              }
            }, 10)
          }
        }
      })
    }
    // 提交校验
    const submit = () => {
      return new Promise((resolve, reject) => {
        SForm.value.validate((valid, fields) => {
          if (valid) {
            resolve(props.form)
          } else {
            // 滚动到未填写处
            scroll(fields)
          }
        })
      })
    }
    // 重置
    const reset = () => {
      SForm.value.resetFields()
    }

    return {
      SForm,
      submit,
      reset,
    }
  },
}
</script>

<style lang="less" scoped>
.row {
  .el-col {
    min-width: 350px;
  }
  // 小于375px的屏幕时
  @media screen and (max-width: 375px) {
    .el-col{
      min-width: 95%;
    }
    .el-input {
      min-width: 80%!important;
    }
  }
  
  .el-input {
    min-width: 250px;
  }
  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    min-width: 250px;
  }
}
</style>