<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-08 15:52:59
 * @LastEditTime: 2021-09-10 14:55:02
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <svg :class="svgClass"
       v-bind="$attrs"
       :style="{color: color}">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>


import { defineProps, computed } from "vue";

const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  }
})

const iconName = computed(() => `#icon-${props.iconClass}`);
const svgClass = computed(() => {
  // console.log(props,props.iconClass, 'props.name');
  if (props.name) {
    return `svg-icon ${props.iconClass}`
  }
  return 'svg-icon'
});
</script>

<style lang='less'>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
  cursor: pointer;
}
</style>
