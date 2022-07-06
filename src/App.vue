<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script>
import { useI18n } from 'vue-i18n';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  name: 'App',
  setup () {
    const i18n = useI18n()
    var jsSrc = (navigator.language || navigator.browserLanguage).toLowerCase();
    console.log(jsSrc)
    sessionStorage.setItem('locale', jsSrc);
    i18n.locale.value = jsSrc;
    return {
      locale :zhCn
    }
  }
}
</script>