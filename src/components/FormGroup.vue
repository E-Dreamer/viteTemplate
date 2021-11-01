<template>
    <div id="FormGroup">
        <slot></slot>
    </div>
</template>
<script>
import {reactive,toRefs} from 'vue'
import { $on } from 'vue-happy-bus'
export default {
    name: "FormGroup",
    props: {
        model: {
            type: Object
        },
        rules: {
            type: Object
        }
    },
    provide() {     // 子组件可以通过 inject 获取父组件提供的值
        return {
            rules: this.rules
        }
    },
    setup(){
        const state = reactive({
            //每个FromItem组件创建时会自动添加进来
            fields:[],// 储存当前的 form-item的实例
        })
        return {
            ...toRefs(state)
        }
    },
    methods: {
        validate: function () {
            return new Promise(resolve => {
                // 对当前所有form-item 进行校验
                let valid = true;   // 默认是通过
                let count = 0;      // 来匹配当前是否是全部检查完
                // 循环调用每个表单项中的验证函数
                this.fields.forEach(field => {
                    field.validation('', errorMsg => {
                        // 只要有一个不符合那么当前的校验就是未通过的
                        // errorMsg是校验后返回的错误描述，只要errorMsg内容不为空，说明校验未通过
                        if (errorMsg) {
                            valid = false;
                        }
                        // 当每个form-item校验完后才返回结果
                        if (++count === this.fields.length - 1) {  //减去非必填的注册字段, 邀请码
                            return resolve(valid);
                        }
                    });
                })
            })
        }
    },
    created(){
        //formGroup中动态增加表单项
        $on('on-form-item-add',item=>{ 
            if (item) {
                this.fields.push(item)
            }
        });
        //formGroup中动态删除表单项
        $on('on-form-item-remove',item=>{
            if (item.type) {// 如果当前没有type的话，表示当前不要进行删除（因为没有注入）
                this.fields.splice(this.fields.indexOf(item), 1)
            }
        })
    }
}
</script>
<style scoped>

</style>
