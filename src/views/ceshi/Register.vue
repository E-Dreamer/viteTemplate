<template>
    <div id="Register" class="pdlr30">

        <!-- <router-link to="/" class="logo"><img src="@@/images/logo.png" alt=""></router-link> -->

        <!-- 注册 go -->
        <div class="registered">

            <form-group ref="formGroup" :model="formModel" :rules="ruleValidate">
                <form-item type="mobile" v-model="formModel.mobile" placeholder="请输入手机号"/>

                <form-item type="mobileCaptcha" v-model="formModel.mobileCaptcha" placeholder="请输入验证码"/>

                <form-item type="password" v-model="formModel.password" placeholder="请设置登录密码"/>

                <form-item type="confirm" v-model="formModel.confirm" placeholder="请重复输入登录密码"/>

                <form-item v-model="formModel.invitationCode"  placeholder="请输入邀请码非必填"/>

            </form-group>

            <button type="submit" class="reg-btn" @click="handSubmit">注册</button>

            <div class="lding ld-user"><router-link to="/user/signin">已有账号登录</router-link></div>
            <!-- <div class="lding ld-terms">登录即表示你同意网站的<router-link to="javascript:;">《服务条款》</router-link></div> -->
        </div>
        <!-- 注册 end -->

    </div>
</template>

<script>
import FormGroup from "@/components/FormGroup.vue"
import FormItem from "@/components/FormItem.vue"
import {mapActions} from 'vuex'
// import {existMobile} from '@/api/core/User'

// 手机号是否已绑定
const hasBind = (rule, value, callback) => {
    existMobile(value).then(res => {
        if(res.data){
            return callback(new Error("手机号已注册"));
        }else{
            return callback();
        }
    })
};

export default {
    name: "Register",
    components: {
        FormGroup,
        FormItem
    },

    data () {

        let confirmPwd = (rule, value, callback) => {
            if(value === this.formModel.password){
                return callback();
            }else{
                return callback(new Error('两次密码不一致'))
            }
        };

        return {
            hasSubmit: false,   //防重复提交
            formModel: {
                mobile: "",
                password: "",
                confirm: "",
                mobileCaptcha: "",
                invitationCode: ""
            },

            ruleValidate: {
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
                    { validator: hasBind, trigger: 'blur'},
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '请输入6位以上的密码', trigger: 'blur' }
                ],
                confirm: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    { validator: confirmPwd, trigger: 'blur' }
                ],
                mobileCaptcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { pattern: /\d{6}$/, message: '请输入有效的验证码', trigger: 'blur' }
                ]
            }
        }
    },

    methods: {

        ...mapActions([
            'register',
            'getUserInfo'
        ]),
        allInput(val,key){
          console.log(val,key)
        },
        handSubmit: function() {
            console.log(this.formModel)
            console.log(this.formModel)
             
            if(this.hasSubmit){
                return;
            }
            this.hasSubmit = true; 
           this.$refs.formGroup.validate().then((valid) => {
                   
                if(!valid){
                    this.hasSubmit = false;
                    return false;
                }

               
                let params = {
                    mobile: this.formModel.mobile,
                    captcha: this.formModel.mobileCaptcha,
                    password: this.formModel.password
                };

                //对邀请码进行处理
                if(this.formModel.invitationCode != ""){
                    //截取邀请码
                    let code = this.formModel.invitationCode;
                    code = code.substring(code.lastIndexOf("/")+1,code.length);
                    params.invitationCode = code;
                    
                }

                // 执行登录操作
                this.register(params).then(() => {

                    this.getUserInfo().then(() => {
                        this.$router.push("/user/settings")
                    });
                    this.hasSubmit = false;

                }).catch(err => {
                    if(err.response.data.error_code == "4001003"){
                        alert("请输入正确的验证码!");
                    }
                    if(err.response.data.error_code == "4091001"){
                       alert("请输入正确的邀请码!");
                    }
                    this.hasSubmit = false;
                    console.log(err.response);


                    //console.log(' 这是error' + err.response.data.message) // 错误响应body，服务端自定义
                    //console.log('=====>> 请求失败: status = '+err.response.status+'['+ err.response.data.message+']')
                })
            })
        }
    }
}
</script>

<style scoped>
/* @import "~@@/css/login.css"; */
</style>
