/**
 * @description: 多选框
 * @param {*}
 * @return {*}
 */
import { defineComponent, PropType, ComputedRef } from 'vue'
import { SearchInfo, Action } from './types/action'
import { IUseCheckboxProps } from 'element-plus/lib/components/checkbox/src/useCheckbox'
import { AnyFunction } from 'element-plus/es/utils/types';
interface ICheckboxGroupInstance {
  name?: string;
  modelValue?: ComputedRef;
  disabled?: ComputedRef<boolean>;
  min?: ComputedRef<string | number>;
  max?: ComputedRef<string | number>;
  size?: ComputedRef<string>;
  fill?: ComputedRef<string>;
  textColor?: ComputedRef<string>;
  checkboxGroupSize?: ComputedRef<string>;
  changeEvent?: AnyFunction<any>;
}
interface InputAction extends Action {
  componentProps?: IUseCheckboxProps,
  optionsProps?: ICheckboxGroupInstance
}
export default defineComponent({
  props: {
    action: {
      type: Object as PropType<InputAction>,
      default: () => {
        return {}
      },
    },
    searchInfo: {
      type: Object as PropType<SearchInfo>,
      default: () => {
        return {}
      },
    },
  },
  setup(props) {
    const { action, searchInfo } = props
    const componentProps = action?.componentProps
    const render = () => {
      return (
        <el-checkbox-group v-model={searchInfo[action.field]} {...componentProps}>
          {
            action.options.map(item => {
              return (
                <el-checkbox label={item.label} disabled={item.disabled || false} border={item.border || false} />
              )
            })
          }
        </el-checkbox-group>
      )
    }
    return render
  },
})
