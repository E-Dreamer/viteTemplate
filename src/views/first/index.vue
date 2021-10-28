<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:25:07
 * @LastEditTime: 2021-10-28 09:06:35
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div class="first">
    <!-- <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
      <SForm ref="ruleForm" :formList="formList" :form="form" :rules="rules"></SForm>
      <el-button @click="see">查看</el-button>
    </el-dialog> -->

    <!-- <el-button @click='dialogVisible=true'>弹出</el-button> -->
     <SForm ref="ruleForm" :formList="formList" :form="form" :rules="rules"></SForm>
      <el-button @click="see">查看</el-button>
  </div>
</template>

<script>
import SForm from '@com/SForm/index.vue'
import { onMounted, reactive, toRefs, watch, ref } from 'vue'
export default {
  name: "first",
  components: { SForm },

  setup () {
    onMounted(() => {

    })
    const ruleForm = ref(null)

    const state = reactive({
      dialogVisible: false,
      formList: [
        {
          label: '第一项',
          key: 'firstValue',
          // labelWidth:"100",
          type: "input",
          plac: '请输入第一项',
          colSpan: 6
        },
        {
          label: '第二项',
          key: 'secondValue',
          type: 'input',
          subType: 'number',
          max: 2,
          colSpan: 6
        },
        {
          label: '第三项',
          key: 'threeValue',
          type: 'input',
          subType: 'textarea',
          rows: 5,
          colSpan: 6
        },
        {
          label: '第四项',
          key: 'fourValue',
          type: 'radio',
          colSpan: 6,
          options: [
            {
              label: '3',
              value: 'lalal'
            },
            {
              label: '4',
              value: 'asdasd'
            },
            {
              label: 5,
              value: '123123'
            }
          ]
        },
        {
          label: '第五项',
          key: 'fiveValue',
          type: 'select',
          colSpan: 12,
          options: [
            {
              label: 'lalalal',
              value: 2
            },
            {
              label: 'asdasd',
              value: 4
            },
            {
              label: 'ajsdjaskhd',
              value: '7'
            }
          ],
          // labelFilter:(item)=>{
          //   return `这是${item.label}_${item.value}`
          // }
          // filter:(val,options)=>{
          //   return options.map(item=>{
          //     return item.label.includes(val)
          //   })
          // }
        },
        {
          label: '第六项',
          key: 'sixValue',
          type: 'switch',
          colSpan: 12
        }
      ],
      form: {
        firstValue: '',
        secondValue: 2,
        threeValue: '',
        fourValue: '',
        fiveValue: '',
        sixValue: ''
      },
      rules: {
        firstValue: [{
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur',
        }]
      },
    })
    const see = () => {
      ruleForm.value.submit().then(res => {
        console.log(res)
      })
    }
    const handleClose = () => {
      state.dialogVisible = false
    }
    return {
      ...toRefs(state),
      see,
      ruleForm,
      handleClose
    }
  }
}
</script>

<style lang="less" scoped>
div {
  font-size: 30px;
}
</style>