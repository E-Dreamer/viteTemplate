<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-09 16:01:22
 * @LastEditTime: 2021-09-09 16:01:28
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script>
import { onBeforeMount, onBeforeUnmount, reactive, toRefs } from "vue";
import screenfull from "screenfull";

export default {
  name: "Screenfull",
  setup() {
    const state = reactive({
      isFullscreen: false,
      click: () => {
        if (!screenfull.isEnabled) {
          this.$message({
            message: "you browser can not work",
            type: "warning",
          });
          return false;
        }
        screenfull.toggle();
      },
      change: () => {
        state.isFullscreen = screenfull.isFullscreen;
      },
      init: () => {
        if (screenfull.isEnabled) {
          screenfull.on("change", state.change);
        }
      },
      destroy: () => {
        if (screenfull.enabled) {
          screenfull.off("change", state.change);
        }
      },
    });

    onBeforeMount(() => {
      state.init();
    });
    onBeforeUnmount(() => {
      state.destroy();
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
