<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:25:07
 * @LastEditTime: 2021-11-02 16:22:16
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div class="first">
    <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
      <SForm ref="ruleForm" :formList="formList" :form="form" :rules="rules"></SForm>
      <el-button @click="see">查看</el-button>
    </el-dialog>

    <el-button @click='dialogVisible=true'>弹出</el-button>
     <!-- <SForm ref="ruleForm" :formList="formList" :form="form" :rules="rules"></SForm>
      <el-button @click="see">查看</el-button> -->
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
            type: 'input',
            label: '第一项',
            key: 'first',
            props: {
              maxlength: '10',
              placeholder: '请输入第一项'
            }
          },
          {
            type: 'input',
            label: '数字',
            key: 'number',
            subType: 'number',
            props: {
              max: 3
            }
          },
          {
            type: 'input',
            label: '密码框',
            key: 'second',
            props: {
              showPassword: true
            }
          },
          {
            type: 'input',
            subType: 'textarea',
            label: '文本框',
            key: 'three',
            props: {
              rows: 4
            }
          },

          {
            type: 'radio',
            key: 'radio',
            label: '单选',
            options: [
              {
                label: '1',
                value: 'sadasda'
              },
              {
                label: '2',
                value: 'asdasdas'
              }
            ],
            props: {
              border: true
            }
          },
          {
            type: 'radio',
            key: 'check',
            subType: 'check',
            label: '多选',
            options: [
              {
                label: '4',
                props: {
                  disabled: false
                }
              },
              {
                label: '5',
                props: {
                  disabled: false
                }
              }
            ],
            props: {
              border: true
            }
          },
          {
            type: 'select',
            key: 'select',
            label: '下拉框',
            props: {
              clearable: true
            },
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }]
          },
          {
            type: 'switch',
            key: 'switch',
            label: '开关'
          },
          {
            type: 'date',
            key: 'date',
            label: '日期单选'
          },
          {
            type: 'date',
            key: 'date1',
            label: '日期多选',
            props: {
              type: 'daterange',
              endPlaceholder: '结束'
            }
          },
          {
            type: 'date',
            subType: 'dateTimePicker',
            key: 'timepick',
            label: '日期时间单选',
            labelWidth: '120px',
            props: {
              type: 'datetime'
            }
          },
          {
            type: 'date',
            subType: 'dateTimePicker',
            key: 'timepick1',
            label: '日期时间多选',
            labelWidth: '120px',
            props: {
              type: 'datetimerange'
            }
          },
          {
            type: 'date',
            subType: 'timePicker',
            key: 'time',
            label: '时间',
            props: {
              isRange: true,
              endPlaceholder: '结束'
            }
          }
        ],
      form: {
        first: '',
        secondValue: 2,
        threeValue: '',
        fourValue: '',
        fiveValue: '',
        sixValue: ''
      },
      rules: {
        first: [{
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