<template>
    <div id="FormInput">
        <div class="item item1" v-if="type === 'mobile'">
            <div class="select">
                <select>
                    <option value="86">+86</option>
                    <option value="60">+60</option>
                    <option value="81">+81</option>
                    <option value="66">+66</option>
                </select>
            </div>

            <input type="text" v-model="inputValue" maxlength="11" @input="onFieldChange" @blur="onFieldBlur" @focus="error_msg = ''" :placeholder="placeholder">
            <p class="error" v-show="error_msg">{{error_msg}}</p>
        </div>

        <div class="item item2" v-else-if="type === 'mobileCaptcha'">
			<input type="text" v-model="inputValue" maxlength="6" @input="onFieldChange" @blur="onFieldBlur" @focus="error_msg = ''" :placeholder="placeholder">
			<a href="javascript:;" :class="[hasSend ? 'countdown' : 'captcha-btn']"  @click="getMobileCaptcha">{{captchaBtnText}}</a>
            <p class="error" v-show="error_msg">{{error_msg}}</p>
        </div>

        <div class="item item3" v-else-if="type === 'password'">
            <input type="password" v-model="inputValue" maxlength="24" @input="onFieldChange" @blur="onFieldBlur" @focus="error_msg = ''" @keyup.enter="$emit('keyup-enter')"  :placeholder="placeholder">
            <!-- <i class="iconfont iconchakan"></i> -->
            <p class="error" v-show="error_msg">{{error_msg}}</p>
        </div>

        <div class="item item3" v-else-if="type === 'confirm'">
            <input type="password" v-model="inputValue" maxlength="24" @input="onFieldChange" @blur="onFieldBlur" @focus="error_msg = ''" @keyup.enter="$emit('keyup-enter')"  :placeholder="placeholder">
            <!-- <i class="iconfont iconbiyan"></i> -->
            <p class="error" v-show="error_msg">{{error_msg}}</p>
        </div>

        <div class="item item1" v-else-if="type === 'email'">
            <p><i/><input type="text" v-model="inputValue" maxlength="24" @input="onFieldChange" @blur="onFieldBlur" @focus="error_msg = ''" @keyup.enter="$emit('keyup-enter')"  :placeholder="placeholder"></p>
            <p class="error" v-show="error_msg">{{error_msg}}</p>
        </div>

        <div class="item item4" v-else>
            <input type="text" v-model="inputValue" @input="onFieldChange" @blur="onFieldBlur" @focus="error_msg = ''" :placeholder="placeholder">
            <p class="error" v-show="error_msg">{{error_msg}}</p>
        </div>
    </div>
</template>

<script>
import { $on ,$emit} from 'vue-happy-bus'
import schema from 'async-validator';
// import {sendCaptcha} from '@/api/core/Security'
import {reactive, toRefs, computed} from 'vue'

const COUNTDOWN = 60;
export default {

    name: "FormInput",
    inject: ['rules'],   //注入父组件中的变量，需要在父组件中通过 provide 提供

    props: {
        type: { //输入框类型
            type: String,
            required: false,
            default: 'text'
        },
        name: { //主要用于type值相同时区分不同FormItem
            type: String,
            required: false
        },
        error: { //错误提示
            type: String,
            default: ''
        },
        placeholder: {  //输入框中的提示语
            type: String,
            required: false,
        }
    },

    setup(){
      const state = reactive({

            hasSubmit: false,   // 防重复提交
            error_msg: "",       //校验失败后的提示文字
            inputValue: "",      //输入框中的内容
            initialValue: "",    // 储存默认值
            isRequired: false,   // 当前的是否有问题
            validateState: "",   // 是否校验成功

            //短信验证码input属性
            countdown: COUNTDOWN,   //倒计时时间
            hasSend: false,         //短信是否已发送
            mobileInputFiled: null,  //手机号输入框实例
            captchaBtnText:computed(()=>{
                if(state.hasSend){
                    return state.countdown + " 秒";
                }
                return "获取验证码"
            })
        })
        return {
          ...toRefs(state),
        }
    },

    methods: {
        // 获取短信验证码
        getMobileCaptcha: function() {
            if(this.hasSubmit){
                return;
            }
            this.hasSubmit = true;
            let that = this;
            if(!that.hasSend){
                this.mobileInputFiled.validation('blur', errMsg => {
                    if(!errMsg){

                        that.hasSend = true;
                        let timer = setInterval(function () {
                            if(that.countdown > 0){
                                --that.countdown
                            }else{
                                clearInterval(timer);
                                that.countdown = COUNTDOWN;
                                that.hasSend = false;
                            }
                        }, 1000);

                        sendCaptcha(this.mobileInputFiled.inputValue).then(() => {
                            this.hasSubmit = false;
                        }).catch(err => {
                            console.log(err.response.status);
                            this.hasSubmit = false;
                        })
                    }
                    this.hasSubmit = false;
                })
            }
            this.hasSubmit = false;
        },

        // 验证输入框的内容是否符合规则
        validation(trigger, callback=function () {}) {

            // blur 和 change 是否有当前方式的规则
            let rules = this.getFilteredRule(trigger);

            // 判断当前是否有规则
            if (!rules || rules.length === 0) {
                return;
            }
            // 设置状态为校验中
            // async-validator的使用形式
            this.validateState = 'validating';

            let descriptor = {[this.type]: rules};  //校验规则
            let validator = new schema(descriptor); //校验对象
            schema.warning = function(){};  //隐藏console中的警告

            /**
             * 第一个参数即要校验的对象
             * 第二个参数可选，定义使用描述符中的那几个规则进行校验，firstFields: true 只会校验一个
             * 第三参数校验结果的回调函数
             */
            validator.validate({[this.type]: this.inputValue}, { firstFields: true }, (errors, fields) => {

                this.validateState = !errors ? 'success' : 'error';
                this.error_msg = errors ? errors[0].message : '';
                callback(this.error_msg);
            });
        },

        /**
         * 从 FormGroup 的 rules 属性中，获取当前 FormItem 的校验规则
         */
        getRules: function() {

            let rules = this.rules;
            rules = rules ? rules[this.type] : [];

            return [].concat(rules||[])//这种写法可以让规则肯定是一个数组的形式
        },

        /**
         * 绑定事件 进行是否 required 校验
         */
        setRules: function () {

            let rules = this.getRules();    //拿到父组件中当前需要使用的规则
            if (rules.length) {
                // every 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）
                // some 只要有一个符合就返回true
                this.isRequired = rules.some(rule => {
                    // 如果当前校验规则中有必填项，则标记出来
                    return rule.required;
                })
            }
            // blur 事件
            $on('on-form-blur',this.onFieldBlur);
            // change 事件
            $on('on-form-change',this.onFieldChange)
        },

        /**
         * 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
         * 该方法只是对getRules方法返回内容进行了下筛选
         */
        getFilteredRule: function (trigger) {

            let rules = this.getRules();
            // !res.trigger 没有调用方式的时候，默认进行校验
            // filter 过滤出当前需要的规则
            return rules.filter(res => !res.trigger || res.trigger.indexOf(trigger) !== -1)
        },

        // blue 进行表单校验
        onFieldBlur(){
            this.validation('blur')
        },
        // change 进行表单校验
        onFieldChange(){
            this.validation('change')
        },
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;//$parent 找到最近的父节点 $root 根节点
            let name = parent.$options.name; // 获取当前组件实例的name
            // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
            // 循环出当前名称的一样的组件实例
            while (parent && (!name||name!==componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.name;
                }
            }
            // 有节点表示当前找到了name一样的实例
            if (parent) {
                $emit.apply(parent,[eventName].concat(params))
            }
        },
    },

    watch: {
        inputValue(newVal) {
            this.$emit('update:modelValue', newVal)
        },

        error(newVal) {
            this.error_msg = newVal;
        }
    },

    created() {
        // 接收手机号输入框
        if(this.type === 'mobileCaptcha'){
            $on('on-mobile-input-filed', item => {
                this.mobileInputFiled = item
            })
        }
    },

    mounted() {
        // 派发事件，通知上级组件添加表单域
        // 如果没有传入type，则无需校验，也就无需缓存
        if (this.type) {
            this.dispatch('FormGroup','on-form-item-add', this);
        }

        // 发送手机号输入事件，主要用于获取验证码处的监听
        if(this.type === 'mobile'){
           $emit('on-mobile-input-filed', this)
        }
    },

    beforeDestroy() {
        // 派发事件，通知上级组件销毁表单域
        this.dispatch('FormGroup', 'on-form-item-remove', this);
    }
}
</script>
<style scoped>
.error{
        line-height: .5rem;
        margin-top: .3rem;
        font-size: 14px;
        color: #c41b20;
        margin-left: 1.8rem;
    }
</style>
