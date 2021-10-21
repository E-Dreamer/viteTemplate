<template>
  <div id="FormInput">

    <div class="item item1"
         v-if="type === 'mobile'">
      <input type="text"
             v-model="inputValue"
             maxlength="11"
             @input="onFieldChange"
             @blur="onFieldBlur"
             @focus="error_msg = ''"
             :placeholder="placeholder">
      <p class="error"
         v-show="error_msg">{{error_msg}}</p>
    </div>

    <div class="item item2"
         v-else-if="type === 'mobileCaptcha'">
      <input type="text"
             v-model="inputValue"
             maxlength="6"
             @input="onFieldChange"
             @blur="onFieldBlur"
             @focus="error_msg = ''"
             :placeholder="placeholder">
      <a href="javascript:;"
         :class="[hasSend ? 'countdown' : 'captcha-btn']"
         @click="getMobileCaptcha">{{captchaBtnText}}</a>
      <p class="error"
         v-show="error_msg">{{error_msg}}</p>
    </div>

    <div class="item item3"
         v-else-if="type === 'password'">
      <input type="password"
             v-model="inputValue"
             maxlength="24"
             @input="onFieldChange"
             @blur="onFieldBlur"
             @focus="error_msg = ''"
             @keyup.enter="$emit('keyup-enter')"
             :placeholder="placeholder">
      <i class="iconfont iconchakan"></i>
      <p class="error"
         v-show="error_msg">{{error_msg}}</p>
    </div>

    <div class="item item3"
         v-else-if="type === 'confirm'">
      <input type="password"
             v-model="inputValue"
             maxlength="24"
             @input="onFieldChange"
             @blur="onFieldBlur"
             @focus="error_msg = ''"
             @keyup.enter="$emit('keyup-enter')"
             :placeholder="placeholder">
      <i class="iconfont iconbiyan"></i>
      <p class="error"
         v-show="error_msg">{{error_msg}}</p>
    </div>

    <div class="item item1"
         v-else-if="type === 'email'">
      <p><i /><input type="text"
               v-model="inputValue"
               maxlength="24"
               @input="onFieldChange"
               @blur="onFieldBlur"
               @focus="error_msg = ''"
               @keyup.enter="$emit('keyup-enter')"
               :placeholder="placeholder"></p>
      <p class="error"
         v-show="error_msg">{{error_msg}}</p>
    </div>

    <div class="item item4"
         v-else>
      <input type="text"
             v-model="inputValue"
             @input="onFieldChange"
             @blur="onFieldBlur"
             @focus="error_msg = ''"
             :placeholder="placeholder">
      <p class="error"
         v-show="error_msg">{{error_msg}}</p>
    </div>
  </div>
</template>

<script>
import { $on, $emit } from 'vue-happy-bus'
// import schema from 'async-validator';
// import {sendCaptcha} from '../api/core/Security'
import { reactive, toRefs, computed, watch, onMounted, getCurrentInstance, inject, onBeforeUnmount } from 'vue'

const COUNTDOWN = 60;
export default {
  name: "FormInput",
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
    },
  },

  setup (props, context) {
    const _this = getCurrentInstance()

    const injectRules = inject('rules'); //注入父组件中的变量，需要在父组件中通过 provide 提供

    const dispatch = (componentName, eventName, params) => {
      const { ctx: { $parent, $root } } = _this;
      let parent = $parent || $root;//$parent 找到最近的父节点 $root 根节点
      let name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        // parent.$emit.apply(parent,[eventName].concat(params))
        $emit.apply(parent,[eventName].concat(params))
        // parent.$emit(eventName, params)
      }
    }

    // 派发事件，通知上级组件添加表单域
    // 如果没有传入type，则无需校验，也就无需缓存
    if (props.type) {
      dispatch('FormGroup', 'on-form-item-add', _this.ctx);
      // 设置初始值，以便在重置时恢复默认值
      //this.initialValue = this.inputValue;
      // 添加表单校验
      //this.setRules()
    }

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
      captchaBtnText: computed(() => {
        if (state.hasSend) {
          return state.countdown + " 秒";
        }
        return "获取验证码"
      })
    })
    watch(() => state.inputValue, (newv) => {
      // context.emit('input', newv)
      context.emit('update:modelValue', newv)
    })
    watch(() => props.error, (newv) => {
      state.error_msg = newv;
    })

    onMounted(() => {
      // 发送手机号输入事件，主要用于获取验证码处的监听
      if (props.type === 'mobile') {
        $emit('on-mobile-input-filed', _this.ctx)
      }
      // 接收手机号输入框
      if (props.type === 'mobileCaptcha') {
        $on('on-mobile-input-filed', item => {
          state.mobileInputFiled = item
        })
      }
    })

    //beforeDestory
    onBeforeUnmount(() => {
      // 派发事件，通知上级组件销毁表单域
      dispatch('FormGroup', 'on-form-item-remove', _this.ctx);
    })

    // 获取短信验证码
    const getMobileCaptcha = () => {

      if (state.hasSubmit) {
        return;
      }
      state.hasSubmit = true;
      if (!state.hasSend) {
        console.log(state.mobileInputFiled)
        state.mobileInputFiled.validation('blur', errMsg => {
          if (!errMsg) {

            state.hasSend = true;

            let timer = setInterval(function () {
              if (state.countdown > 0) {
                --state.countdown
              } else {
                clearInterval(timer);
                state.countdown = COUNTDOWN;
                state.hasSend = false;
              }
            }, 1000);

            sendCaptcha(state.mobileInputFiled.inputValue).then(() => {
              state.hasSubmit = false;
            }).catch(err => {
              console.log(err.response.status);
              state.hasSubmit = false;
            })
          }
          state.hasSubmit = false;
        })
      }
      state.hasSubmit = false;
    }

    // 验证输入框的内容是否符合规则
    const validation = (trigger, callback = function () { }) => {

      // blur 和 change 是否有当前方式的规则
      let rules = getFilteredRule(trigger);

      // 判断当前是否有规则
      if (!rules || rules.length === 0) {
        return
      }
      // 设置状态为校验中
      // async-validator的使用形式
      state.validateState = 'validating';

      let descriptor = { [state.type]: rules };  //校验规则
      //console.log(descriptor)
      let validator = new schema(descriptor); //校验对象
      schema.warning = function () { };  //隐藏console中的警告

      /**
       * 第一个参数即要校验的对象
       * 第二个参数可选，定义使用描述符中的那几个规则进行校验，firstFields: true 只会校验一个
       * 第三参数校验结果的回调函数
       */
      validator.validate({ [state.type]: state.inputValue }, { firstFields: true }, (errors) => {

        state.validateState = !errors ? 'success' : 'error';
        state.error_msg = errors ? errors[0].message : '';
        callback(state.error_msg);
      });
    }
    /**
 * 从 FormGroup 的 rules 属性中，获取当前 FormItem 的校验规则
 */
    const getRules = () => {

      let rules = injectRules;
      rules = rules ? rules[state.type] : [];

      return [].concat(rules || [])//这种写法可以让规则肯定是一个数组的形式
    }
    /**
   * 绑定事件 进行是否 required 校验
   */
    const setRules = () => {

      let rules = getRules();    //拿到父组件中当前需要使用的规则
      if (rules.length) {
        // every 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）
        // some 只要有一个符合就返回true
        state.isRequired = rules.some(rule => {
          // 如果当前校验规则中有必填项，则标记出来
          return rule.required;
        })
      }
      // blur 事件
      $on('on-form-blur', onFieldBlur);
      // change 事件
      $on('on-form-change', onFieldChange)
    }

    /**
     * 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
     * 该方法只是对getRules方法返回内容进行了下筛选
     */
    const getFilteredRule = (trigger) => {

      let rules = getRules();
      // !res.trigger 没有调用方式的时候，默认进行校验
      // filter 过滤出当前需要的规则
      return rules.filter(res => !res.trigger || res.trigger.indexOf(trigger) !== -1)
    }

    // blue 进行表单校验
    const onFieldBlur = () => {
      validation('blur')
    }
    // change 进行表单校验
    const onFieldChange = () => {
      validation('change')
    }

    return {
      ...toRefs(state),
      getMobileCaptcha,
      dispatch,
      setRules,
      getRules,
      getFilteredRule,
      onFieldBlur,
      onFieldChange
    }
  }
}
</script>
<style scoped>
.error {
  line-height: 0.5rem;
  margin-top: 0.3rem;
  font-size: 14px;
  color: #c41b20;
  margin-left: 1.8rem;
}
</style>
