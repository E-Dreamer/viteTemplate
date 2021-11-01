<template>
    <div class="bg">
        <!-- 注册box go -->
        <div class="logonbox mid">
            <!-- left -->
            <div class="fastinfo fl">
                <!-- <a href="/" class="logo"><img src="@@/images/logowihte.png" alt=""></a> -->
                <div class="fastcont">
                    <ul>
                        <li>
                            <span class="ficon1"></span>
                            快速交易2,100多项资产
                        </li>
                        <li>
                            <span class="ficon2"></span>
                            客户资金完全分离，确保安全
                        </li>
                        <li>
                            <span class="ficon3"></span>
                            我们持有牌照并受相关部门监管，<br>为您确保交易安全
                        </li>
                    </ul>
                </div>
            </div>
            <!-- right -->
            <div class="logon fr">
                <h1>创建新的帐户</h1>
                <div class="tab"><a href="javascript:;" class="on">手机注册</a></div>
                <div class="sectionForm">
                    <form-group ref="formGroup" :model="formModel" :rules="ruleValidate">

                        <form-item type="mobile" v-model="formModel.mobile" placeholder="请输入手机号"/>

                        <form-item type="mobileCaptcha" v-model="formModel.mobileCaptcha" placeholder="请输入验证码"/>

                        <form-item type="password" v-model="formModel.password" placeholder="请设置登录密码"/>

                        <form-item type="confirm" v-model="formModel.confirm" placeholder="请重复输入登录密码"/>

                        <form-item v-model="formModel.invitationCode"  placeholder="请输入邀请码非必填"/>

                    </form-group>
                    <button @click="handSubmit">创建一个帐户</button>
                    <div class="haved">已有帐户？请<a href="javascript:;">登录</a></div>
                </div>
            </div>
        </div>
        <!-- 注册box end -->
    </div>
</template>
<script>
import FormGroup from "@/components/FormGroup.vue"
import FormItem from "@/components/FormItem.vue"
import {reactive, toRefs} from 'vue'
// import {validateCaptcha, existMobile} from '@/api/core/Security'

export default {
    name: "Register",
    components: {
        FormGroup,
        FormItem
    },

    setup () {

        let hasBind = (rule, value, callback) => {
            // existMobile(value).then(res => {
            //     if(res){
            //         return callback(new Error("手机号已注册"));
            //     }else{
            //         return callback();
            //     }
            // })
        };

        let confirmPwd = (rule, value, callback) => {
            if(value === state.formModel.password){
                return callback();
            }else{
                return callback(new Error('两次密码不一致'))
            }
        };
        const state = reactive({
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
        })
        return {
          ...toRefs(state),
        }
    },

    methods: {
        handSubmit: function() {
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

                validateCaptcha({account: this.formModel.mobile, captcha: this.formModel.mobileCaptcha}).then((res) => {
                    
                    let params = {
                        mobile: this.formModel.mobile,
                        password: this.formModel.password,
                        invitationCode: this.formModel.invitationCode,
                    };

                    this.$router.push({ name: 'UserInfo', params: params })
                }).catch(err => {
                    alert(err.response.data.message)
                    this.hasSubmit = false;
                })

            })   
        }
    }
}
</script>
<style scoped>
    /* @import url("~@@/css/logon.css");
    @import url("~@@/css/public.css");
    @import url("~@@/iconfont/iconfont.css"); */
</style>