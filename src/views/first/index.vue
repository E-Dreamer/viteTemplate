<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:25:07
 * @LastEditTime: 2021-10-21 11:08:39
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>first {{count}}</div>
  <el-form ref="ruleForm1"
           :model="ruleForm"
           status-icon
           :rules="rules"
           label-width="120px"
           class="demo-ruleForm">
    <el-form-item label="Password"
                  prop="pass">
      <el-input v-model="ruleForm.pass"
                type="password"
                autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Confirm"
                  prop="checkPass">
      <el-input v-model="ruleForm.checkPass"
                type="password"
                autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Age"
                  prop="age">
      <el-input v-model.number="ruleForm.age"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="submitForm('ruleForm1')">Submit</el-button>
      <el-button @click="resetForm('ruleForm1')">Reset</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import { onMounted, reactive, toRefs,watch } from 'vue'
export default {
  name: "first",
  setup () {
    const getCount = () => {
      console.log(state.count)
    }
    onMounted(() => {
      getCount()
    })
    const state = reactive({
      count: 10,
      rules: {},
      ruleForm:{
         pass: '',
         checkPass: '',
         age: '12',
      }
    })
    watch(state.ruleForm,(newv,oldv)=>{
      console.log(newv,oldv)
    })
    
    return {
      ...toRefs(state),
      getCount,
    }
  },
  methods: {
    submitForm (formName) {
      console.log(this.ruleForm.model.age)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
  }
}
</script>

<style lang="less" scoped>
div {
  font-size: 30px;
}
</style>